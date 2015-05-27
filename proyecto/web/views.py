# -*- coding: utf-8 -*-
from __future__ import unicode_literals  # Soporte unicode en Py2.x

from django.shortcuts import render, redirect
from django.views.decorators.http import require_GET
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from django.core.serializers import serialize
from django.core.exceptions import ObjectDoesNotExist
from django.core.urlresolvers import reverse
from django.db.models import Q
from django.http import HttpResponse

from json import dumps
from operator import itemgetter

from .models import Competicion, Equipo, Jugador, Participante, Partido
from .utils import paginate, calc_matchs


@require_GET
def home(request):
    context = {
        'view': 'inicio',
        'title': 'Inicio',
    }

    return render(request, 'index.djhtml', context)


@require_http_methods(["GET", "POST"])
def usuario(request):
    if not request.user.is_authenticated():
        return redirect('web:home')

    context = {
        'title': 'Usuario',
    }

    if request.user.is_superuser:
        context['title'] += ' | Administración'

    if request.POST:
        if request.user.is_superuser and 'uid' in request.POST:
            try:
                usuario = User.objects.get(id=request.POST['uid'])
                context['afectado'] = "%s %s (%s)" % (usuario.first_name,
                                                      usuario.last_name,
                                                      usuario.username)
                if 'activar' in request.POST:
                    usuario.is_active = True
                    context['activado'] = True
                elif 'desactivar' in request.POST:
                    usuario.is_active = False
                    context['desactivado'] = True
                elif 'normal' in request.POST:
                    usuario.is_superuser = False
                    context['normal'] = True
                elif 'super' in request.POST:
                    usuario.is_superuser = True
                    context['administrador'] = True

                usuario.save()
            except ObjectDoesNotExist:
                context['error'] = 'edit'
        elif 'moddatos' in request.POST:
            nombre = apellidos = email = None

            if 'nombre' in request.POST:
                nombre = request.POST['nombre']

            if 'apellidos' in request.POST:
                apellidos = request.POST['apellidos']

            if 'email' in request.POST:
                email = request.POST['email']

            if nombre and apellidos and email:
                request.user.first_name = nombre
                request.user.last_name = apellidos
                request.user.email = email
                request.user.save()
                context['chgdatos'] = True
            else:
                context['error'] = 'campos'

        elif 'modpasswd' in request.POST:
            passwd = newpasswd = newpasswdchk = None

            if 'passwd' in request.POST:
                passwd = request.POST['passwd']

            if 'newpasswd' in request.POST:
                newpasswd = request.POST['newpasswd']

            if 'newpasswdchk' in request.POST:
                newpasswdchk = request.POST['newpasswdchk']

            if passwd and newpasswd and newpasswdchk:
                if newpasswd == newpasswdchk:
                    user = authenticate(username=request.user.username,
                                        password=passwd)

                    if user:
                        user.set_password(newpasswd)
                        user.save()
                        update_session_auth_hash(request, user)
                        context['chgpasswd'] = True
                    else:
                        context['error'] = 'oldpasswd'
                else:
                    context['error'] = 'newpasswd'
            else:
                context['error'] = 'campos'

    if request.user.is_superuser:
        context['usuarios'] = User.objects.all()

    return render(request, 'usuario.djhtml', context)


@require_http_methods(["GET", "POST"])
def do_login(request):
    if request.user.is_authenticated():
        return redirect(request.GET.get('r', 'web:home'))
    elif request.POST:
        username = password = None

        if 'username' in request.POST:
            username = request.POST['username']
        if 'password' in request.POST:
            password = request.POST['password']

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    login(request, user)
                    return redirect(request.GET.get('r', 'web:home'))
                else:
                    context = {
                        'title': 'Login: Usuario inactivo',
                        'inactivo': True,
                        'r': request.GET.get('r', None),
                    }
            else:
                context = {
                    'title': 'Login: Datos incorrectos',
                    'incorrecto': True,
                    'r': request.GET.get('r', None),
                }
        else:
            context = {
                'title': 'Login: Datos vacios',
                'vacios': True,
                'r': request.GET.get('r', None),
            }
    else:
        context = {
            'title': 'Login',
            'r': request.GET.get('r', None),
        }

    return render(request, 'login.djhtml', context)


@require_GET
def do_logout(request):
    logout(request)
    return redirect(request.GET.get('r', 'web:home'))


@require_http_methods(["GET", "POST"])
def registro(request):
    if request.user.is_authenticated():
        return redirect('web:home')
    elif request.POST:
        username = passwd1 = passwd2 = email = nombre = apellidos = None

        if 'userName' in request.POST:
            username = request.POST['userName']
        if 'password' in request.POST:
            passwd1 = request.POST['password']
        if 'passwordConfirm' in request.POST:
            passwd2 = request.POST['passwordConfirm']
        if 'email' in request.POST:
            email = request.POST['email']
        if 'email' in request.POST:
            nombre = request.POST['realName']
        if 'email' in request.POST:
            apellidos = request.POST['lastName']

        if not username or not passwd1 or not passwd2 or not email or \
           not nombre or not apellidos:
            context = {
                'title': 'Registro: Campos vacíos',
                'vacios': True,
            }
        elif passwd1 != passwd2:
            context = {
                'title': 'Registro: Las contraseñas no coinciden',
                'passwds': True,
            }
        elif User.objects.filter(username=username).exists():
            context = {
                'title': 'Registro: El usuario ya existe',
                'existe': True,
            }
        else:
            nuevo = User.objects.create_user(username, email, passwd1,
                                             first_name=nombre,
                                             last_name=apellidos)
            nuevo.is_active = False
            nuevo.save()
            context = {
                'title': 'Registro: Correcto',
                'correcto': True,
            }
    else:
        context = {
            'title': 'Registro',
        }

    return render(request, 'registro.djhtml', context)


@require_http_methods(["GET", "POST"])
def competiciones(request, pagina=1):
    tmpContext = {}

    if request.POST and request.user.is_authenticated():
        nNombre = nTemporada = nImagen = nEquipos = None
        nPrivada = False

        if 'nombre' in request.POST:
            nNombre = request.POST['nombre']

        if 'temporada' in request.POST:
            nTemporada = request.POST['temporada']

        if 'equipo' in request.POST:
            nEquipos = request.POST.getlist('equipo')

        if 'privada' in request.POST:
            nPrivada = True

        if 'imagen' in request.FILES:
            nImagen = request.FILES['imagen']

        if nNombre and nTemporada and nImagen and nEquipos:
            if Competicion.objects.filter(nombre=nNombre,
                                          temporada=nTemporada).exists():
                tmpContext['error'] = 'existe'
            else:
                nJornadas, nPartidos = calc_matchs(nEquipos)

                nCompeticion = Competicion(nombre=nNombre, foto=nImagen,
                                           temporada=nTemporada,
                                           administrador=request.user,
                                           privada=nPrivada,
                                           jornadas=nJornadas)

                nCompeticion.save()

                for eid in nEquipos:
                    nCompeticion.participantes.add(Equipo.objects.get(id=eid))

                for jor in range(1, nJornadas+1):
                    for part in nPartidos[jor]:
                        nuevoPartido = Partido(competicion=nCompeticion,
                                               equipo_loc_id=part[0],
                                               equipo_vis_id=part[1],
                                               jornada=jor)
                        nuevoPartido.save()

                tmpContext['nuevo'] = nNombre
        else:
            tmpContext['error'] = 'campos'

    pagina = int(pagina)

    if pagina == 0:
        return redirect('web:competiciones')

    total = Competicion.objects.filter(privada=False).count()

    inicio, fin, pagina_max = paginate(10, pagina, total)

    if inicio > total:
        return redirect('web:competiciones', pagina=pagina_max)

    context = {
        'view': 'competiciones',
        'title': 'Competiciones | Página ' + str(pagina),
        'pagina': pagina,
        'pagina_max': pagina_max,
        'tipo': 'pub',
        'competiciones': Competicion.objects.filter(privada=False)
        .order_by('-temporada')[inicio:fin],
    }

    context.update(tmpContext)

    return render(request, 'competiciones.djhtml', context)


@require_http_methods(["GET", "POST"])
def competiciones_privadas(request, pagina=1):
    if not request.user.is_authenticated():
        return redirect("%s?r=%s" %
                        (reverse('web:login'), request.get_full_path()))
    tmpContext = {}

    if request.POST and request.user.is_authenticated():
        nNombre = nTemporada = nImagen = nEquipos = None
        nPrivada = False

        if 'nombre' in request.POST:
            nNombre = request.POST['nombre']

        if 'temporada' in request.POST:
            nTemporada = request.POST['temporada']

        if 'equipo' in request.POST:
            nEquipos = request.POST.getlist('equipo')

        if 'privada' in request.POST:
            nPrivada = True

        if 'imagen' in request.FILES:
            nImagen = request.FILES['imagen']

        if nNombre and nTemporada and nImagen and nEquipos:
            if Competicion.objects.filter(nombre=nNombre,
                                          temporada=nTemporada).exists():
                tmpContext['error'] = 'existe'
            else:
                nJornadas, nPartidos = calc_matchs(nEquipos)

                nCompeticion = Competicion(nombre=nNombre, foto=nImagen,
                                           temporada=nTemporada,
                                           administrador=request.user,
                                           privada=nPrivada,
                                           jornadas=nJornadas)

                nCompeticion.save()

                for eid in nEquipos:
                    nCompeticion.participantes.add(Equipo.objects.get(id=eid))

                for jor in range(1, nJornadas+1):
                    for part in nPartidos[jor]:
                        nuevoPartido = Partido(competicion=nCompeticion,
                                               equipo_loc_id=part[0],
                                               equipo_vis_id=part[1],
                                               jornada=jor)
                        nuevoPartido.save()

                tmpContext['nuevo'] = nNombre
        else:
            tmpContext['error'] = 'campos'

    pagina = int(pagina)

    if pagina == 0:
        return redirect('web:competiciones_privadas')

    total = Competicion.objects.filter(
        privada=True, administrador=request.user).count()

    inicio, fin, pagina_max = paginate(10, pagina, total)

    if inicio > total:
        return redirect('web:competiciones_privadas', pagina=pagina_max)

    context = {
        'view': 'competiciones',
        'title': 'Competiciones privadas | Página ' + str(pagina),
        'pagina': pagina,
        'pagina_max': pagina_max,
        'tipo': 'prv',
        'competiciones': Competicion.objects
        .filter(privada=True, administrador=request.user)
        .order_by('-temporada')[inicio:fin],
    }

    context.update(tmpContext)

    return render(request, 'competiciones.djhtml', context)


@require_http_methods(["GET", "POST"])
def competicion(request, id_competicion, pagina=1):
    try:
        comp = Competicion.objects.get(id=id_competicion)
    except ObjectDoesNotExist:
        comp = None

    if comp is None:
        context = {
            'title': 'No existe la competición',
        }
    elif comp.privada and not request.user.is_authenticated():
        return redirect("%s?r=%s" %
                        (reverse('web:login'), request.get_full_path()))
    elif (comp.privada and (
            request.user.is_authenticated() and
            request.user != comp.administrador
    )):
        context = {
            'title': 'No se puede mostrar la competición',
            'noperm': True,
        }
    else:
        tmpContext = {}

        if request.POST and request.user.is_authenticated() \
           and (request.user.is_superuser or
                request.user == comp.administrador):

            if 'partido' in request.POST:
                part = Partido.objects.get(id=request.POST['partido'])
                part.celebrado = True
                part.goles_loc = 0
                part.goles_vis = 0
                part.amarillas_loc = 0
                part.amarillas_vis = 0
                part.rojas_loc = 0
                part.rojas_vis = 0

                Participante.objects.filter(partido=part).delete()

                for j in request.POST['jugadores_loc'].split(','):
                    if 'jloc-' + j in request.POST:
                        nR = True if 'rloc-' + j in request.POST else False
                        nA = request.POST['aloc-' + j]
                        nG = request.POST['gloc-' + j]
                        nGPP = request.POST['gpploc-' + j]

                        nP = Participante(partido=part,
                                          jugador_id=j,
                                          equipo=part.equipo_loc,
                                          roja=nR,
                                          amarillas=nA,
                                          goles=nG,
                                          goles_pp=nGPP)

                        nP.save()

                        part.goles_loc += int(nG)
                        part.goles_vis += int(nGPP)
                        part.amarillas_loc += int(nA)
                        if nR:
                            part.rojas_loc += 1

                for j in request.POST['jugadores_vis'].split(','):
                    if 'jvis-' + j in request.POST:
                        nR = True if 'rvis-' + j in request.POST else False
                        nA = request.POST['avis-' + j]
                        nG = request.POST['gvis-' + j]
                        nGPP = request.POST['gppvis-' + j]

                        nP = Participante(partido=part,
                                          jugador_id=j,
                                          equipo=part.equipo_vis,
                                          roja=nR,
                                          amarillas=nA,
                                          goles=nG,
                                          goles_pp=nGPP)

                        nP.save()

                        part.goles_vis += int(nG)
                        part.goles_loc += int(nGPP)
                        part.amarillas_vis += int(nA)
                        if nR:
                            part.rojas_vis += 1

                part.save()

                tmpContext['partActualizado'] = True

            else:
                if 'nombre' in request.POST:
                    comp.nombre = request.POST['nombre']

                if 'imagen' in request.FILES:
                    comp.foto = request.FILES['imagen']

                comp.save()

                tmpContext['actualizado'] = True

        jornadas = {}

        for jornada in range(1, comp.jornadas + 1):
            jornadas[jornada] = Partido.objects \
                                       .filter(competicion__id=id_competicion,
                                               jornada=jornada,
                                               celebrado=False) \
                                       .exists()

        clasificacion = []

        for equipo in comp.participantes.all():
            puntos = 0
            jugados = 0
            ganados = 0
            empatados = 0
            perdidos = 0
            goles_favor = 0
            goles_contra = 0

            partidos = Partido.objects.filter(Q(equipo_loc=equipo) |
                                              Q(equipo_vis=equipo),
                                              competicion__id=id_competicion,
                                              celebrado=True)

            for partido in partidos:
                # Calculo de los partidos
                if partido.goles_loc == partido.goles_vis:
                    empatados += 1
                elif (
                        (
                            equipo == partido.equipo_loc and
                            partido.goles_loc > partido.goles_vis
                        ) or (
                            equipo == partido.equipo_vis and
                            partido.goles_vis > partido.goles_loc
                        )
                ):
                    ganados += 1
                else:
                    perdidos += 1

                # Calculo de goles
                if equipo == partido.equipo_loc:
                    goles_favor += partido.goles_loc
                    goles_contra += partido.goles_vis
                else:
                    goles_favor += partido.goles_vis
                    goles_contra += partido.goles_loc

            jugados = empatados + ganados + perdidos
            puntos = ganados*3 + empatados

            clasificacion.append((equipo, puntos, jugados,
                                  ganados, empatados, perdidos,
                                  goles_favor, goles_contra))

            clasificacion.sort(key=itemgetter(1, 2), reverse=True)

        context = {
            'title': 'Competición: ' + comp.nombre,
            'competicion': comp,
            'clasificacion': clasificacion,
            'jornadas': jornadas,
        }

    context['view'] = 'competiciones'

    context.update(tmpContext)

    return render(request, 'competicion.djhtml', context)


@require_http_methods(["GET", "POST"])
def equipos(request, pagina=1):
    tmpContext = {}

    if request.POST and request.user.is_authenticated() \
       and request.user.is_superuser:
        nNombre = nCampo = nImagen = None

        if 'nombre' in request.POST:
            nNombre = request.POST['nombre']

        if 'campo' in request.POST:
            nCampo = request.POST['campo']

        if 'imagen' in request.FILES:
            nImagen = request.FILES['imagen']

        if nNombre and nCampo and nImagen:
            if Equipo.objects.filter(nombre=nNombre).exists():
                tmpContext['error'] = 'existe'
            else:
                nuevoEquipo = Equipo(nombre=nNombre, foto=nImagen,
                                     campo=nCampo)
                nuevoEquipo.save()
                tmpContext['nuevo'] = nNombre
        else:
            tmpContext['error'] = 'campos'

    pagina = int(pagina)

    if pagina == 0:
        return redirect('web:equipos')

    total = Equipo.objects.count()

    inicio, fin, pagina_max = paginate(10, pagina, total)

    if inicio > total:
        return redirect('web:equipos', pagina=pagina_max)

    context = {
        'view': 'equipos',
        'title': 'Equipos | Página ' + str(pagina),
        'pagina': pagina,
        'pagina_max': pagina_max,
        'equipos': Equipo.objects.order_by('nombre')[inicio:fin],
    }

    context.update(tmpContext)

    return render(request, 'equipos.djhtml', context)


@require_http_methods(["GET", "POST"])
def equipo(request, id_equipo, pagina=1):
    try:
        equi = Equipo.objects.get(id=id_equipo)
    except ObjectDoesNotExist:
        equi = None

    if not equi:
        context = {
            'title': 'No se puede mostrar el jugador',
        }
    else:
        tmpContext = {}

        if request.POST and request.user.is_authenticated() \
           and request.user.is_superuser:
            if 'nombre' in request.POST:
                if Equipo.objects.filter(nombre=request.POST['nombre']) \
                                 .exists():
                    tmpContext['error'] = 'existe'
                else:
                    equi.nombre = request.POST['nombre']

            if 'campo' in request.POST:
                equi.campo = request.POST['campo']

            if 'imagen' in request.FILES:
                equi.foto = request.FILES['imagen']

            tmpContext['actualizado'] = True

            equi.save()

        pagina = int(pagina)

        if pagina == 0:
            return redirect('web:equipo', id_equipo=id_equipo)

        total = Competicion.objects.filter(participantes__id=id_equipo).count()

        inicio, fin, pagina_max = paginate(10, pagina, total)

        if inicio > total:
            return redirect('web:equipo', id_equipo=id_equipo,
                            pagina=pagina_max)

        context = {
            'title': 'Equipo: ' + equi.nombre,
            'equipo': equi,
            'pagina': pagina,
            'pagina_max': pagina_max,
            'jugadores': Jugador.objects.filter(equipo__id=id_equipo),
            'competiciones': Competicion.objects
            .filter(participantes__id=id_equipo)
            .order_by('-temporada')[inicio:fin]
        }

    context['view'] = 'equipos'

    context.update(tmpContext)

    return render(request, 'equipo.djhtml', context)


@require_http_methods(["GET", "POST"])
def jugadores(request, pagina=1, posicion=None):
    tmpContext = {}

    if request.POST and request.user.is_authenticated() \
       and request.user.is_superuser:
        nNombre = nEquipo = nPosicion = nDorsal = nImagen = None

        if 'name' in request.POST:
            nNombre = request.POST['name']

        if 'equipo' in request.POST:
            nEquipo = request.POST['equipo']

        if 'pos' in request.POST:
            nPosicion = request.POST['pos']

        if 'dorsal' in request.POST:
            nDorsal = request.POST['dorsal']

        if 'imagen' in request.FILES:
            nImagen = request.FILES['imagen']

        if nNombre and nEquipo and nPosicion and nDorsal and nImagen:
            try:
                equipoObj = Equipo.objects.get(id=nEquipo)
                nuevoJugador = Jugador(nombre=nNombre, foto=nImagen,
                                       posicion=nPosicion, dorsal=nDorsal,
                                       equipo=equipoObj)
                nuevoJugador.save()
                tmpContext['nuevo'] = nNombre
            except ObjectDoesNotExist:
                tmpContext['error'] = 'equipo'
        else:
            tmpContext['error'] = 'campos'

    pagina = int(pagina)

    if pagina == 0:
        if posicion:
            return redirect('web:jugadores', posicion=posicion)
        else:
            return redirect('web:jugadores')

    if posicion:
        total = Jugador.objects.filter(posicion=posicion).count()
    else:
        total = Jugador.objects.count()

    inicio, fin, pagina_max = paginate(10, pagina, total)

    if inicio > total:
        if posicion:
            return redirect('web:jugadores', pagina=pagina_max,
                            posicion=posicion)
        else:
            return redirect('web:jugadores', pagina=pagina_max)

    context = {
        'view': 'jugadores',
        'title': 'Jugadores | Página ' + str(pagina),
        'pagina': pagina,
        'pagina_max': pagina_max,
        'posicion': posicion,
    }

    if posicion:
        context['jugadores'] = Jugador.objects.filter(posicion=posicion) \
                                              .order_by('nombre')[inicio:fin]
    else:
        context['jugadores'] = Jugador.objects.order_by('nombre')[inicio:fin]

    context.update(tmpContext)

    return render(request, 'jugadores.djhtml', context)


@require_http_methods(["GET", "POST"])
def jugador(request, id_jugador, pagina=1):
    try:
        jug = Jugador.objects.get(id=id_jugador)
    except ObjectDoesNotExist:
        jug = None

    if not jug:
        context = {
            'title': 'No se puede mostrar el jugador',
        }
    else:
        tmpContext = {}

        if request.POST and request.user.is_authenticated() \
           and request.user.is_superuser:
            if 'nombre' in request.POST:
                jug.nombre = request.POST['nombre']

            if 'equipo' in request.POST:
                try:
                    jug.equipo = Equipo.objects.get(id=request.POST['equipo'])
                except ObjectDoesNotExist:
                    tmpContext['error'] = 'equipo'

            if 'dorsal' in request.POST:
                jug.dorsal = request.POST['dorsal']

            if 'imagen' in request.FILES:
                jug.foto = request.FILES['imagen']

            tmpContext['actualizado'] = True

            jug.save()

        pagina = int(pagina)

        if pagina == 0:
            return redirect('web:jugador', id_jugador=id_jugador)

        total = Participante.objects.filter(jugador__id=id_jugador).count()

        inicio, fin, pagina_max = paginate(10, pagina, total)

        if inicio > total:
            return redirect('web:jugador', id_jugador=id_jugador,
                            pagina=pagina_max)

        context = {
            'title': 'Jugador: ' + jug.nombre,
            'jugador': jug,
            'pagina': pagina,
            'pagina_max': pagina_max,
            'partidos': Participante.objects.filter(jugador__id=id_jugador)
            .order_by('partido__jornada')[inicio:fin]
        }

        context.update(tmpContext)

    context['view'] = 'jugadores'

    return render(request, 'jugador.djhtml', context)


@require_GET
def partido(request, id_partido):
    try:
        part = Partido.objects.get(id=id_partido)
    except ObjectDoesNotExist:
        part = None

    if (not part or
        (part.competicion.privada and (
            not request.user.is_authenticated() or
            request.user != part.competicion.administrador))):
        context = {
            'title': 'No se puede mostrar el partido',
        }
    else:
        context = {
            'title': 'Partido: ' + part.equipo_loc.nombre + ' - ' +
            part.equipo_vis.nombre,
            'partido': part,
            'jugadores_loc': Participante.objects
            .filter(partido=part, equipo=part.equipo_loc),
            'jugadores_vis': Participante.objects
            .filter(partido=part, equipo=part.equipo_vis),
        }

    return render(request, 'partido.djhtml', context)


@require_GET
def get_equipos(request):
    return HttpResponse(serialize('json',
                                  Equipo.objects.all(),
                                  fields=('nombre')))


@require_GET
def get_jugadores(request, id_equipo):
    return HttpResponse(serialize('json',
                                  Jugador.objects
                                  .filter(equipo__id=id_equipo),
                                  fields=('nombre', 'dorsal',
                                          'posicion')))


@require_GET
def get_jugadores_new(request, id_partido, id_equipo):
    jugadores = Jugador.objects.filter(equipo__id=id_equipo).order_by('dorsal')
    participantes = Participante.objects.filter(partido__id=id_partido,
                                                equipo__id=id_equipo)

    jugs = []
    jugsId = []
    for jugador in jugadores:
        jugsId.append(jugador.id)
        jugs.append({
            'pk': jugador.id,
            'fields': {
                'nombre': jugador.nombre,
                'dorsal': jugador.dorsal,
                'posicion': jugador.get_posicion_display(),
                'amarillas': 0,
                'roja': False,
                'goles': 0,
                'goles_pp': 0,
                'jugado': False,
            }
        })

    for participante in participantes:
        if participante.jugador.id in jugsId:
            idx = jugsId.index(participante.jugador.id)
            jugs[idx]['fields']['amarillas'] = participante.amarillas
            jugs[idx]['fields']['roja'] = participante.roja
            jugs[idx]['fields']['goles'] = participante.goles
            jugs[idx]['fields']['goles_pp'] = participante.goles_pp
            jugs[idx]['fields']['jugado'] = True
        else:
            jugs.append({
                'pk': participante.jugador.id,
                'fields': {
                    'nombre': participante.jugador.nombre,
                    'dorsal': participante.jugador.dorsal,
                    'posicion': participante.jugador.get_posicion_display(),
                    'amarillas': participante.amarillas,
                    'roja': participante.roja,
                    'goles': participante.goles,
                    'goles_pp': participante.goles_pp,
                    'jugado': True,
                }
            })

    return HttpResponse(dumps(jugs))


@require_GET
def get_dorsales(request, id_equipo):
    return HttpResponse(serialize('json',
                                  Jugador.objects
                                  .filter(equipo__id=id_equipo),
                                  fields=('dorsal')))


@require_GET
def get_partidos(request, id_competicion, jornada):
    return HttpResponse(serialize('json',
                                  Partido.objects
                                  .filter(competicion__id=id_competicion,
                                          jornada=jornada),
                                  fields=('equipo_loc', 'equipo_vis',
                                          'goles_loc', 'goles_vis',
                                          'celebrado')))


@require_GET
def get_jugador(request, id_partido, id_jugador):
    return HttpResponse(serialize('json',
                                  Participante.objects
                                  .filter(partido__id=id_partido,
                                          jugador__id=id_jugador),
                                  fields=('amarillas', 'roja',
                                          'goles', 'goles_pp')))
