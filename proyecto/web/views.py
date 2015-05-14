from django.shortcuts import render, redirect
from django.views.decorators.http import require_GET  # , require_POST
# from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist

from .models import Competicion, Equipo, Jugador, Participante, Partido

import math


@require_GET
def home(request):
    context = {
        'title': 'Inicio',
    }

    return render(request, 'index.djhtml', context)


@require_GET
def competiciones(request, pagina=1):
    pagina = int(pagina)

    if pagina == 0:
        return redirect('web:competiciones')

    total = Competicion.objects.filter(privada=False).count()
    muestra = 10

    pagina_max = math.ceil(total / muestra)

    inicio = (pagina - 1) * muestra

    if inicio > total:
        return redirect('web:competiciones', pagina=pagina_max)

    fin = inicio + muestra
    if fin > total:
        fin = total

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
    muestra = 10

    pagina_max = math.ceil(total / muestra)

    inicio = (pagina - 1) * muestra

    if inicio > total:
        return redirect('web:competiciones_privadas', pagina=pagina_max)

    fin = inicio + muestra
    if fin > total:
        fin = total

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
            'view': 'competiciones',
            'title': 'No existe la competición',
        }
    elif comp.privada and not request.user.is_authenticated():
        return redirect('web:competiciones')  # TBD Ir al login
    elif (comp.privada and (
            request.user.is_authenticated() and
            request.user.id is not comp.administrador.id
    )):
        context = {
            'views': 'competiciones',
            'noperm': True,
            'title': 'No se puede mostrar la competición',
        }
    else:
        pagina = int(pagina)

        if pagina == 0:
            return redirect('web:competicion', id_competicion=id_competicion)

        total = Partido.objects.filter(competicion__id=id_competicion).count()

        muestra = 10

        pagina_max = math.ceil(total / muestra)

        inicio = (pagina - 1) * muestra

        if inicio > total:
            return redirect('web:competicion', id_competicion=id_competicion,
                            pagina=pagina_max)

        fin = inicio + muestra
        if fin > total:
            fin = total

        context = {
            'view': 'competiciones',
            'title': 'Competición: ' + comp.nombre,
            'competicion': comp,
            'pagina': pagina,
            'pagina_max': pagina_max,
            'partidos': Partido.objects.filter(competicion__id=id_competicion)
            .order_by('jornada')[inicio:fin]
        }

    return render(request, 'competicion.djhtml', context)


@require_GET
def equipos(request, pagina=1):
    pagina = int(pagina)

    if pagina == 0:
        return redirect('web:equipos')

    total = Equipo.objects.count()
    muestra = 10

    pagina_max = math.ceil(total / muestra)

    inicio = (pagina - 1) * muestra

    if inicio > total:
        return redirect('web:equipos', pagina=pagina_max)

    fin = inicio + muestra
    if fin > total:
        fin = total

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
            'view': 'jugadores',
            'title': 'No se puede mostrar el jugador',
        }
    else:
        pagina = int(pagina)

        if pagina == 0:
            return redirect('web:equipo', id_equipo=id_equipo)

        total = Competicion.objects.filter(participantes__id=id_equipo).count()

        muestra = 10

        pagina_max = math.ceil(total / muestra)

        inicio = (pagina - 1) * muestra

        if inicio > total:
            return redirect('web:equipo', id_equipo=id_equipo,
                            pagina=pagina_max)

        fin = inicio + muestra
        if fin > total:
            fin = total

        context = {
            'view': 'equipos',
            'title': 'Equipo: ' + equi.nombre,
            'equipo': equi,
            'pagina': pagina,
            'pagina_max': pagina_max,
            'jugadores': Jugador.objects.filter(equipo__id=id_equipo),
            'competiciones': Competicion.objects
            .filter(participantes__id=id_equipo)
            .order_by('-temporada')[inicio:fin]
        }

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

    muestra = 10

    pagina_max = math.ceil(total / muestra)

    inicio = (pagina - 1) * muestra

    if inicio > total:
        if posicion:
            return redirect('web:jugadores', pagina=pagina_max,
                            posicion=posicion)
        else:
            return redirect('web:jugadores', pagina=pagina_max)

    fin = inicio + muestra
    if fin > total:
        fin = total

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
            'view': 'jugadores',
            'title': 'No se puede mostrar el jugador',
        }
    else:
        pagina = int(pagina)

        if pagina == 0:
            return redirect('web:jugador', id_jugador=id_jugador)

        total = Participante.objects.filter(jugador__id=id_jugador).count()

        muestra = 10

        pagina_max = math.ceil(total / muestra)

        inicio = (pagina - 1) * muestra

        if inicio > total:
            return redirect('web:jugador', id_jugador=id_jugador,
                            pagina=pagina_max)

        fin = inicio + muestra
        if fin > total:
            fin = total

        context = {
            'view': 'jugadores',
            'title': 'Jugador: ' + jug.nombre,
            'jugador': jug,
            'pagina': pagina,
            'pagina_max': pagina_max,
            'partidos': Participante.objects.filter(jugador__id=id_jugador)
            .order_by('partido__jornada')[inicio:fin]
        }

    return render(request, 'jugador.djhtml', context)
