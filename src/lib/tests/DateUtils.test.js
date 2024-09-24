/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
jest.dontMock('../DateUtils');
const DateUtils = require('../DateUtils');

describe('isDate', () => {
  it('only returns true for Date objects', () => {
    expect(DateUtils.isDate(new Date())).toBe(true);
    expect(DateUtils.isDate(12)).toBe(false);
    expect(DateUtils.isDate({})).toBe(false);
  });

  it('returns true for Parse date objects', () => {
    const parseDate = { __type: 'Date', iso: '2024-09-03T05:42:00.000Z' };
    expect(DateUtils.isDate(parseDate)).toBe(true);
  })

  it('returns false for objects that look like dates but are not valid', () => {
    const invalidDate = { __type: 'Date', iso: 123 };
    expect(DateUtils.isDate(invalidDate)).toBe(false);

    const incompleteParseDate = { __type: 'Date' };
    expect(DateUtils.isDate(incompleteParseDate)).toBe(false);
  });
});

describe('shortMonth', () => {
  it('provides appropriate shortened versions', () => {
    expect(DateUtils.shortMonth(0)).toBe('Jan');
    expect(DateUtils.shortMonth(1)).toBe('Feb');
    expect(DateUtils.shortMonth(5)).toBe('June');
    expect(DateUtils.shortMonth(6)).toBe('July');
    expect(DateUtils.shortMonth(8)).toBe('Sept');
  });

  it('does not fail on invalid months', () => {
    expect(DateUtils.shortMonth(-1)).toBe('');
    expect(DateUtils.shortMonth(12)).toBe('');
  });
});

describe('nextMonth', () => {
  it('returns the first day of the next month', () => {
    const start = new Date(2001, 2, 3, 4, 5, 6);
    const next = DateUtils.nextMonth(start);
    expect(next.getFullYear()).toBe(2001);
    expect(next.getMonth()).toBe(3);
    expect(next.getDate()).toBe(1);
    expect(next.getHours()).toBe(0);
    expect(next.getMinutes()).toBe(0);
    expect(next.getSeconds()).toBe(0);
  });
});

describe('prevMonth', () => {
  it('returns the first day of the previous month', () => {
    const start = new Date(2001, 2, 3, 4, 5, 6);
    const next = DateUtils.prevMonth(start);
    expect(next.getFullYear()).toBe(2001);
    expect(next.getMonth()).toBe(1);
    expect(next.getDate()).toBe(1);
    expect(next.getHours()).toBe(0);
    expect(next.getMinutes()).toBe(0);
    expect(next.getSeconds()).toBe(0);
  });
});

describe('daysInMonth', () => {
  it('returns the days in each month', () => {
    expect(DateUtils.daysInMonth(new Date(2015, 0))).toBe(31);
    expect(DateUtils.daysInMonth(new Date(2015, 1))).toBe(28);
    expect(DateUtils.daysInMonth(new Date(2012, 1))).toBe(29);
    expect(DateUtils.daysInMonth(new Date(2015, 8))).toBe(30);
  });
});

describe('formatParsedDate', () => {
  it('correctly formats a native Date object to ISO string', () => {
    const date = new Date('2024-09-03T05:42:00.000Z');
    const formattedDate = DateUtils.formatParsedDate(date);
    expect(formattedDate).toBe(date.toISOString());
  });

  it('correctly formats a Parse Date object to ISO string', () => {
    const parseDate = { __type: 'Date', iso: '2024-09-03T05:42:00.000Z' };
    const formattedDate = DateUtils.formatParsedDate(parseDate);
    expect(formattedDate).toBe('2024-09-03T05:42:00.000Z');
  });
});
