# -*- coding: utf-8 -*-
from __future__ import unicode_literals  # Soporte unicode en Py2.x

from django.shortcuts import render, redirect
from django.views.decorators.http import require_GET
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q

from .models import Competicion, Equipo, Jugador, Participante, Partido
from .utils import paginate


@require_GET
def home(request):
    context = {
        'title': 'Inicio',
    }

    return render(request, 'index.djhtml', context)


@require_http_methods(["GET", "POST"])
def do_login(request):
    if request.POST:
        logout(request)
        username = password = None

        username = request.POST['username']
        password = request.POST['password']

        if username and password:
            user = authenticate(username=username, password=password)
            if user is not None:
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


@require_GET
def competiciones(request, pagina=1):
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

    return render(request, 'competiciones.djhtml', context)


@require_GET
def competiciones_privadas(request, pagina=1):
    if not request.user.is_authenticated():
        return redirect('web:competiciones')  # TBD Ir al login

    pagina = int(pagina)

    if pagina == 0:
        return redirect('web:competiciones_privadas')

    total = Competicion.objects.filter(
        privada=True, administrador__id=request.user.id).count()

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
        .filter(privada=True, administrador__id=request.user.id)
        .order_by('-temporada')[inicio:fin],
    }

    return render(request, 'competiciones.djhtml', context)


@require_GET
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
        return redirect('web:competiciones')  # TBD Ir al login
    elif (comp.privada and (
            request.user.is_authenticated() and
            request.user.id is not comp.administrador.id
    )):
        context = {
            'title': 'No se puede mostrar la competición',
            'noperm': True,
        }
    else:
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

        context = {
            'title': 'Competición: ' + comp.nombre,
            'competicion': comp,
            'clasificacion': clasificacion,
        }

    context['view'] = 'competiciones'
    return render(request, 'competicion.djhtml', context)


@require_GET
def equipos(request, pagina=1):
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

    return render(request, 'equipos.djhtml', context)


@require_GET
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
    return render(request, 'equipo.djhtml', context)


@require_GET
def jugadores(request, pagina=1, posicion=None):
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

    return render(request, 'jugadores.djhtml', context)


@require_GET
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

    context['view'] = 'jugadores'
    return render(request, 'jugador.djhtml', context)
