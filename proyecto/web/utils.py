# -*- coding: utf-8 -*-
import math


def paginate(number, current, total):
    max_page = int(math.ceil(total / float(number)))
    start = int((current - 1) * number)
    end = int(start + number)

    if end > total:
        end = int(total)

    return (start, end, max_page)


def calc_matchs(teams):
    match_calendar = {}

    num_teams = len(teams)
    num_days = num_teams - 1
    num_half = int(num_teams / 2)

    teams_wo_first = teams[1:]
    num_teams_wo_first = len(teams_wo_first)

    for day in range(0, num_days):
        way_matchs = []
        return_matchs = []

        way_matchs.append((teams_wo_first[day % num_teams_wo_first],
                           teams[0]))
        return_matchs.append((teams[0],
                              teams_wo_first[day % num_teams_wo_first]))

        for idx in range(1, num_half):
            first_team = (day + idx) % num_teams_wo_first
            second_team = (day + num_teams_wo_first - idx) % num_teams_wo_first

            way_matchs.append((teams_wo_first[first_team],
                               teams_wo_first[second_team]))
            return_matchs.append((teams_wo_first[second_team],
                                  teams_wo_first[first_team]))

        match_calendar[day + 1] = list(way_matchs)
        match_calendar[day + 1 + num_days] = list(return_matchs)

    return num_days*2, match_calendar
