# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0006_auto_20150514_1131'),
    ]

    operations = [
        migrations.AddField(
            model_name='partido',
            name='celebrado',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='partido',
            name='fecha',
            field=models.DateField(default=datetime.datetime(2015, 5, 14, 13, 33, 56, 355809)),
        ),
    ]
