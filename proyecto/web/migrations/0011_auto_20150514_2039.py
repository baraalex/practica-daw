# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0010_partido_jornada'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='partido',
            name='fecha',
        ),
        migrations.AlterField(
            model_name='partido',
            name='amarillas_loc',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='partido',
            name='amarillas_vis',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='partido',
            name='goles_loc',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='partido',
            name='goles_vis',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='partido',
            name='rojas_loc',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='partido',
            name='rojas_vis',
            field=models.PositiveSmallIntegerField(default=0),
        ),
    ]
