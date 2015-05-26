# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0011_auto_20150514_2039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jugador',
            name='nombre',
            field=models.CharField(max_length=64),
        ),
    ]
