from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    # Competiciones
    url(r'^competiciones/$', views.competiciones,
        name='competiciones'),
    url(r'^competiciones/(?P<pagina>[0-9]+)/$', views.competiciones,
        name='competiciones'),
    url(r'^competicion/(?P<id_competicion>[0-9]+)/$', views.competicion,
        name='competicion'),
    # Equipos
    url(r'^equipos/$', views.equipos,
        name='equipos'),
    url(r'^equipos/(?P<pagina>[0-9]+)/$', views.equipos,
        name='equipos'),
    url(r'^equipo/(?P<id_equipo>[0-9]+)/$', views.equipo,
        name='equipo'),
    # Jugadores
    url(r'^jugadores/$', views.jugadores,
        name='jugadores'),
    url(r'^jugadores/(?P<pagina>[0-9]+)/$', views.jugadores,
        name='jugadores'),
    url(r'^jugador/(?P<id_jugador>[0-9]+)/$', views.jugador,
        name='jugador'),
]
