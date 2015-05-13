# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0003_auto_20150512_1344'),
    ]

    operations = [
        migrations.AddField(
            model_name='competicion',
            name='privada',
            field=models.BooleanField(default=False),
        ),
    ]
