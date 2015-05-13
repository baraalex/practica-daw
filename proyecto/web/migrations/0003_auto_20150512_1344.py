# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0002_auto_20150512_1342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participante',
            name='substituye',
            field=models.ForeignKey(to='web.Jugador', blank=True, null=True, related_name='substituye'),
        ),
    ]
