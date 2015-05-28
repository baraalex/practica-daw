# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0014_competicion_jornadas'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='participante',
            name='substituye',
        ),
        migrations.RemoveField(
            model_name='participante',
            name='titular',
        ),
    ]
