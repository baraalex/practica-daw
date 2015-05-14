# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0005_competicion_formada'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competicion',
            name='nombre',
            field=models.CharField(max_length=140),
        ),
    ]
