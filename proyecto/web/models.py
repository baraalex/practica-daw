# -*- coding: utf-8 -*-
from __future__ import unicode_literals  # Soporte unicode en Py2.x

from django.db import models
from django.contrib.auth.models import User


class Equipo(models.Model):
    nombre = models.CharField(max_length=64, unique=True, null=False)
    foto = models.ImageField()
    campo = models.CharField(max_length=64, null=False)

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre


class Jugador(models.Model):
    POSICIONES = (
        ('po', 'Portero'),
        ('df', 'Defensa'),
        ('ce', 'Centrocampista'),
        ('dl', 'Delantero'),
    )

    nombre = models.CharField(max_length=64, null=False)
    foto = models.ImageField()
    posicion = models.CharField(max_length=2, choices=POSICIONES, null=False)
    dorsal = models.PositiveSmallIntegerField(null=False)
    equipo = models.ForeignKey(Equipo, null=False)

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre


class Competicion(models.Model):
    nombre = models.CharField(max_length=140, null=False)
    foto = models.ImageField()
    temporada = models.CharField(max_length=9, null=False)
    participantes = models.ManyToManyField(Equipo)
    administrador = models.ForeignKey(User, null=False)
    privada = models.BooleanField(default=False)
    jornadas = models.PositiveSmallIntegerField(default=0, null=False)

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre


class Partido(models.Model):
    competicion = models.ForeignKey(Competicion, null=False)
    equipo_loc = models.ForeignKey(Equipo, null=False,
                                   related_name='equipo_loc')
    equipo_vis = models.ForeignKey(Equipo, null=False,
                                   related_name='equipo_vis')
    jornada = models.PositiveSmallIntegerField(null=False)
    celebrado = models.BooleanField(default=False, null=False)
    goles_loc = models.PositiveSmallIntegerField(default=0, null=False)
    goles_vis = models.PositiveSmallIntegerField(default=0, null=False)
    amarillas_loc = models.PositiveSmallIntegerField(default=0, null=False)
    amarillas_vis = models.PositiveSmallIntegerField(default=0, null=False)
    rojas_loc = models.PositiveSmallIntegerField(default=0, null=False)
    rojas_vis = models.PositiveSmallIntegerField(default=0, null=False)

    def __unicode__(self):
        return "%s - %s [%s - %s] (Competición: %s)" % (
            self.equipo_loc, self.equipo_vis,
            self.goles_loc, self.goles_vis,
            self.competicion)

    def __str__(self):
        return "%s - %s [%s - %s] (Competición: %s)" % (
            self.equipo_loc, self.equipo_vis,
            self.goles_loc, self.goles_vis,
            self.competicion)


class Participante(models.Model):
    partido = models.ForeignKey(Partido, null=False)
    jugador = models.ForeignKey(Jugador, null=False)
    equipo = models.ForeignKey(Equipo, null=False)
    roja = models.BooleanField(default=False)
    amarillas = models.PositiveSmallIntegerField(null=False)
    goles = models.PositiveSmallIntegerField(null=False)
    goles_pp = models.PositiveSmallIntegerField(null=False)

    def __unicode__(self):
        return "%s [%s]" % (self.jugador, self.partido)

    def __str__(self):
        return "%s [%s]" % (self.jugador, self.partido)
