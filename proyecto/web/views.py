from django.shortcuts import render, redirect
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.http import require_http_methods

from .models import Competicion, Equipo, Jugador

import math


@require_GET
def home(request):
    context = {
        'title': 'Inicio',
        'ultimas_competiciones': Competicion.objects.order_by('-id')[:5],
    }

    return render(request, 'index.djhtml', context)


@require_GET
def competiciones(request, pagina=1):
    pagina = int(pagina)

    if pagina == 0:
        return redirect('web:competiciones')

    total = Competicion.objects.count()
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
        'total': total,
        'inicio': inicio,
        'fin': fin,
        'competiciones': Competicion.objects.order_by('-id')[inicio:fin],
    }

    return render(request, 'competiciones.djhtml', context)


@require_GET
def competicion(request, id_competicion):
    comp = Competicion.objects.get(id=id_competicion)
    context = {
        'view': 'competiciones',
        'title': comp.nombre,
        'competicion': comp,
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
        'total': total,
        'inicio': inicio,
        'fin': fin,
        'equipos': Equipo.objects.order_by('nombre')[inicio:fin],
    }

    return render(request, 'equipos.djhtml', context)


@require_GET
def equipo(request, id_equipo):
    equi = Equipo.objects.get(id=id_equipo)
    context = {
        'view': 'equipos',
        'title': equi.nombre,
        'equipo': equi,
    }
    return render(request, 'equipo.djhtml', context)


@require_GET
def jugadores(request, pagina=1):
    pagina = int(pagina)

    if pagina == 0:
        return redirect('web:jugadores')

    total = Jugador.objects.count()
    muestra = 10

    pagina_max = math.ceil(total / muestra)

    inicio = (pagina - 1) * muestra

    if inicio > total:
        return redirect('web:jugadores', pagina=pagina_max)

    fin = inicio + muestra
    if fin > total:
        fin = total

    context = {
        'view': 'jugadores',
        'title': 'Jugadores | Página ' + str(pagina),
        'pagina': pagina,
        'pagina_max': pagina_max,
        'total': total,
        'inicio': inicio,
        'fin': fin,
        'jugadores': Jugador.objects.order_by('nombre')[inicio:fin],
    }

    return render(request, 'jugadores.djhtml', context)


@require_GET
def jugador(request, id_jugador):
    jug = Jugador.objects.get(id=id_jugador)
    context = {
        'view': 'jugadores',
        'title': jug.nombre,
        'jugador': jug,
    }
    return render(request, 'jugador.djhtml', context)
