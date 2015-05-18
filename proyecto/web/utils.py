# -*- coding: utf-8 -*-
import math


def paginate(number, current, total):
    max_page = int(math.ceil(total / float(number)))
    start = int((current - 1) * number)
    end = int(start + number)

    if end > total:
        end = int(total)

    return (start, end, max_page)
