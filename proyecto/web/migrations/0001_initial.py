# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Competicion',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('nombre', models.CharField(unique=True, max_length=140)),
                ('foto', models.ImageField(upload_to='')),
                ('temporada', models.CharField(max_length=9)),
                ('administrador', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Equipo',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('nombre', models.CharField(unique=True, max_length=64)),
                ('foto', models.ImageField(upload_to='')),
                ('campo', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Jugador',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('nombre', models.CharField(unique=True, max_length=64)),
                ('foto', models.ImageField(upload_to='')),
                ('posicion', models.CharField(max_length=2, choices=[('po', 'Portero'), ('df', 'Defensa'), ('ce', 'Centrocampista'), ('dl', 'Delantero')])),
                ('dorsal', models.PositiveSmallIntegerField()),
                ('equipo', models.ForeignKey(to='web.Equipo')),
            ],
        ),
        migrations.CreateModel(
            name='Participante',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('titular', models.BooleanField(default=False)),
                ('roja', models.BooleanField(default=False)),
                ('amarillas', models.PositiveSmallIntegerField()),
                ('goles', models.PositiveSmallIntegerField()),
                ('goles_pp', models.PositiveSmallIntegerField()),
                ('equipo', models.ForeignKey(to='web.Equipo')),
                ('jugador', models.ForeignKey(to='web.Jugador')),
            ],
        ),
        migrations.CreateModel(
            name='Partido',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('goles_loc', models.PositiveSmallIntegerField()),
                ('goles_vis', models.PositiveSmallIntegerField()),
                ('amarillas_loc', models.PositiveSmallIntegerField()),
                ('amarillas_vis', models.PositiveSmallIntegerField()),
                ('rojas_loc', models.PositiveSmallIntegerField()),
                ('rojas_vis', models.PositiveSmallIntegerField()),
                ('competicion', models.ForeignKey(to='web.Competicion')),
                ('equipo_loc', models.ForeignKey(related_name='equipo_loc', to='web.Equipo')),
                ('equipo_vis', models.ForeignKey(related_name='equipo_vis', to='web.Equipo')),
            ],
        ),
        migrations.AddField(
            model_name='participante',
            name='partido',
            field=models.ForeignKey(to='web.Partido'),
        ),
        migrations.AddField(
            model_name='participante',
            name='substituye',
            field=models.ForeignKey(null=True, related_name='substituye', to='web.Jugador'),
        ),
        migrations.AddField(
            model_name='competicion',
            name='participantes',
            field=models.ManyToManyField(to='web.Equipo'),
        ),
    ]
