# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0008_auto_20150514_1335'),
    ]

    operations = [
        migrations.AlterField(
            model_name='partido',
            name='fecha',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
