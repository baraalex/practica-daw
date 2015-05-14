# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0009_auto_20150514_1336'),
    ]

    operations = [
        migrations.AddField(
            model_name='partido',
            name='jornada',
            field=models.PositiveSmallIntegerField(default=1),
            preserve_default=False,
        ),
    ]
