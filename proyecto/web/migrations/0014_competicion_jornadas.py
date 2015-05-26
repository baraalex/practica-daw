# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0013_remove_competicion_formada'),
    ]

    operations = [
        migrations.AddField(
            model_name='competicion',
            name='jornadas',
            field=models.PositiveSmallIntegerField(default=0),
        ),
    ]
