# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0004_competicion_privada'),
    ]

    operations = [
        migrations.AddField(
            model_name='competicion',
            name='formada',
            field=models.BooleanField(default=False),
        ),
    ]
