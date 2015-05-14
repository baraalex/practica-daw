# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0007_auto_20150514_1333'),
    ]

    operations = [
        migrations.AlterField(
            model_name='partido',
            name='fecha',
            field=models.DateField(default=datetime.datetime(2015, 5, 14, 11, 35, 0, 563500, tzinfo=utc)),
        ),
    ]
