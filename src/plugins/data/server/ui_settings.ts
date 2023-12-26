/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { i18n } from '@osd/i18n';
import { schema } from '@osd/config-schema';
import { UiSettingsParams } from 'opensearch-dashboards/server';
// @ts-ignore untyped module
import numeralLanguages from '@elastic/numeral/languages';
import { DEFAULT_QUERY_LANGUAGE, UI_SETTINGS } from '../common';

const luceneQueryLanguageLabel = i18n.translate('data.advancedSettings.searchQueryLanguageLucene', {
  defaultMessage: 'Lucene',
});

const queryLanguageSettingName = i18n.translate('data.advancedSettings.searchQueryLanguageTitle', {
  defaultMessage: 'Ngôn ngữ truy vấn',
});

const requestPreferenceOptionLabels = {
  sessionId: i18n.translate('data.advancedSettings.courier.requestPreferenceSessionId', {
    defaultMessage: 'Phiên ID',
  }),
  custom: i18n.translate('data.advancedSettings.courier.requestPreferenceCustom', {
    defaultMessage: 'Tùy chỉnh',
  }),
  none: i18n.translate('data.advancedSettings.courier.requestPreferenceNone', {
    defaultMessage: 'Không có',
  }),
};

// We add the `en` key manually here, since that's not a real numeral locale, but the
// default fallback in case the locale is not found.
const numeralLanguageIds = [
  'en',
  ...numeralLanguages.map((numeralLanguage: any) => {
    return numeralLanguage.id;
  }),
];

export function getUiSettings(): Record<string, UiSettingsParams<unknown>> {
  return {
    [UI_SETTINGS.META_FIELDS]: {
      name: i18n.translate('data.advancedSettings.metaFieldsTitle', {
        defaultMessage: 'Trường meta',
      }),
      value: ['_source', '_id', '_type', '_index', '_score'],
      description: i18n.translate('data.advancedSettings.metaFieldsText', {
        defaultMessage:
          'Các trường tồn tại bên ngoài _source để hợp nhất vào tài liệu của chúng tôi khi hiển thị nó',
      }),
      schema: schema.arrayOf(schema.string()),
    },
    [UI_SETTINGS.DOC_HIGHLIGHT]: {
      name: i18n.translate('data.advancedSettings.docTableHighlightTitle', {
        defaultMessage: 'Làm nổi bật kết quả',
      }),
      value: true,
      description: i18n.translate('data.advancedSettings.docTableHighlightText', {
        defaultMessage:
          'Làm nổi bật các kết quả trong Trang tổng quan Khám phá và Tìm kiếm đã lưu. ' +
          'Việc đánh dấu làm cho các yêu cầu bị chậm khi làm việc trên các tài liệu lớn.',
      }),
      category: ['discover'],
      schema: schema.boolean(),
    },
    [UI_SETTINGS.QUERY_STRING_OPTIONS]: {
      name: i18n.translate('data.advancedSettings.query.queryStringOptionsTitle', {
        defaultMessage: 'Tùy chọn chuỗi truy vấn',
      }),
      value: '{ "analyze_wildcard": true }',
      description: i18n.translate('data.advancedSettings.query.queryStringOptionsText', {
        defaultMessage:
          '{optionsLink} cho trình phân tích cú pháp chuỗi truy vấn lucene. Chỉ được sử dụng khi "{queryLanguage}" được đặt ' +
          'thành {luceneLanguage}.',
        description:
          'Part of composite text: data.advancedSettings.query.queryStringOptions.optionsLinkText + ' +
          'data.advancedSettings.query.queryStringOptionsText',
        values: {
          optionsLink:
            '<a href="https://opensearch.org/docs/latest/opensearch/query-dsl/index/" target="_blank" rel="noopener noreferrer">' +
            i18n.translate('data.advancedSettings.query.queryStringOptions.optionsLinkText', {
              defaultMessage: 'Tùy chọn',
            }) +
            '</a>',
          luceneLanguage: luceneQueryLanguageLabel,
          queryLanguage: queryLanguageSettingName,
        },
      }),
      type: 'json',
      schema: schema.object({
        analyze_wildcard: schema.boolean(),
      }),
    },
    [UI_SETTINGS.QUERY_ALLOW_LEADING_WILDCARDS]: {
      name: i18n.translate('data.advancedSettings.query.allowWildcardsTitle', {
        defaultMessage: 'Cho phép các ký tự đại diện đứng đầu trong truy vấn',
      }),
      value: true,
      description: i18n.translate('data.advancedSettings.query.allowWildcardsText', {
        defaultMessage:
          'Khi được đặt, * được phép làm ký tự đầu tiên trong mệnh đề truy vấn. ' +
          'Hiện tại chỉ áp dụng khi tính năng truy vấn thử nghiệm được bật trong thanh truy vấn. ' +
          'Để không cho phép các ký tự đại diện đứng đầu trong các truy vấn lucene cơ bản, hãy sử dụng {queryStringOptionsPattern}.',
        values: {
          queryStringOptionsPattern: UI_SETTINGS.QUERY_STRING_OPTIONS,
        },
      }),
      schema: schema.boolean(),
    },
    [UI_SETTINGS.SEARCH_QUERY_LANGUAGE]: {
      name: queryLanguageSettingName,
      value: DEFAULT_QUERY_LANGUAGE,
      description: i18n.translate('data.advancedSettings.searchQueryLanguageText', {
        defaultMessage:
          'Ngôn ngữ truy vấn được thanh truy vấn sử dụng. DQL là ngôn ngữ mới được xây dựng riêng cho Bảng điều khiển OpenSearch.',
      }),
      type: 'select',
      options: ['lucene', 'kuery'],
      optionLabels: {
        lucene: luceneQueryLanguageLabel,
        kuery: i18n.translate('data.advancedSettings.searchQueryLanguageDql', {
          defaultMessage: 'DQL',
        }),
      },
      schema: schema.string(),
    },
    [UI_SETTINGS.SORT_OPTIONS]: {
      name: i18n.translate('data.advancedSettings.sortOptionsTitle', {
        defaultMessage: 'Lựa chọn sắp xếp',
      }),
      value: '{ "unmapped_type": "boolean" }',
      description: i18n.translate('data.advancedSettings.sortOptionsText', {
        defaultMessage: '{optionsLink} cho tham số sắp xếp OpenSearch',
        description:
          'Part of composite text: data.advancedSettings.sortOptions.optionsLinkText + ' +
          'data.advancedSettings.sortOptionsText',
        values: {
          optionsLink:
            '<a href="https://opensearch.org/docs/latest/opensearch/ux/#sort-results" target="_blank" rel="noopener noreferrer">' +
            i18n.translate('data.advancedSettings.sortOptions.optionsLinkText', {
              defaultMessage: 'Lựa chọn',
            }) +
            '</a>',
        },
      }),
      type: 'json',
      schema: schema.object({
        unmapped_type: schema.string(),
      }),
    },
    defaultIndex: {
      name: i18n.translate('data.advancedSettings.defaultIndexTitle', {
        defaultMessage: 'Chỉ mục mặc định',
      }),
      value: null,
      type: 'string',
      description: i18n.translate('data.advancedSettings.defaultIndexText', {
        defaultMessage: 'Chỉ mục để truy cập nếu không có chỉ mục nào được đặt',
      }),
      schema: schema.nullable(schema.string()),
    },
    [UI_SETTINGS.COURIER_IGNORE_FILTER_IF_FIELD_NOT_IN_INDEX]: {
      name: i18n.translate('data.advancedSettings.courier.ignoreFilterTitle', {
        defaultMessage: 'Bỏ qua (các) bộ lọc',
      }),
      value: false,
      description: i18n.translate('data.advancedSettings.courier.ignoreFilterText', {
        defaultMessage:
          'Cấu hình này tăng cường hỗ trợ cho các bảng thông tin chứa hình ảnh trực quan truy cập các chỉ mục khác nhau. ' +
          'Khi bị tắt, tất cả các bộ lọc sẽ được áp dụng cho tất cả các hình ảnh trực quan. ' +
          'Khi được bật, (các) bộ lọc sẽ bị bỏ qua để hiển thị trực quan ' +
          `khi chỉ mục của trực quan không chứa trường lọc.`,
      }),
      category: ['search'],
      schema: schema.boolean(),
    },
    [UI_SETTINGS.COURIER_SET_REQUEST_PREFERENCE]: {
      name: i18n.translate('data.advancedSettings.courier.requestPreferenceTitle', {
        defaultMessage: 'Yêu cầu ưu tiên',
      }),
      value: 'sessionId',
      options: ['sessionId', 'custom', 'none'],
      optionLabels: requestPreferenceOptionLabels,
      type: 'select',
      description: i18n.translate('data.advancedSettings.courier.requestPreferenceText', {
        defaultMessage: `Cho phép bạn đặt phân đoạn nào xử lý các yêu cầu tìm kiếm của bạn.
          <ul>
            <li><strong>{sessionId}:</strong> hạn chế các thao tác thực hiện tất cả yêu cầu tìm kiếm trên cùng một phân đoạn.
              Điều này có lợi về việc sử dụng lại bộ nhớ đệm phân đoạn cho các yêu cầu.</li>
            <li><strong>{custom}:</strong> cho phép bạn xác định tùy chọn của riêng mình.
              Sử dụng <strong>'courier:customRequestPreference'</strong> để tùy chỉnh giá trị tùy chọn của bạn.</li>
            <li><strong>{none}:</strong> có nghĩa là không đặt tùy chọn.
            Điều này có thể mang lại hiệu suất tốt hơn vì các yêu cầu có thể được trải rộng trên tất cả các bản sao phân đoạn .\n Tuy nhiên, kết quả có thể không nhất quán vì các phân đoạn khác nhau có thể ở trạng thái làm mới khác nhau.</li>
          </ul>`,
        values: {
          sessionId: requestPreferenceOptionLabels.sessionId,
          custom: requestPreferenceOptionLabels.custom,
          none: requestPreferenceOptionLabels.none,
        },
      }),
      category: ['search'],
      schema: schema.string(),
    },
    [UI_SETTINGS.COURIER_CUSTOM_REQUEST_PREFERENCE]: {
      name: i18n.translate('data.advancedSettings.courier.customRequestPreferenceTitle', {
        defaultMessage: 'Tùy chọn yêu cầu tùy chỉnh',
      }),
      value: '_local',
      type: 'string',
      description: i18n.translate('data.advancedSettings.courier.customRequestPreferenceText', {
        defaultMessage:
          '{requestPreferenceLink} được sử dụng khi {setRequestReferenceSetting} được đặt thành {customSettingValue}.',
        description:
          'Part of composite text: data.advancedSettings.courier.customRequestPreference.requestPreferenceLinkText + ' +
          'data.advancedSettings.courier.customRequestPreferenceText',
        values: {
          setRequestReferenceSetting: `<strong>${UI_SETTINGS.COURIER_SET_REQUEST_PREFERENCE}</strong>`,
          customSettingValue: '"custom"',
          requestPreferenceLink:
            '<a href="https://opensearch.org/docs/latest/opensearch/popular-api" target="_blank" rel="noopener noreferrer">' +
            i18n.translate(
              'data.advancedSettings.courier.customRequestPreference.requestPreferenceLinkText',
              {
                defaultMessage: 'Yêu cầu ưu tiên',
              }
            ) +
            '</a>',
        },
      }),
      category: ['search'],
      schema: schema.string(),
    },
    [UI_SETTINGS.COURIER_MAX_CONCURRENT_SHARD_REQUESTS]: {
      name: i18n.translate('data.advancedSettings.courier.maxRequestsTitle', {
        defaultMessage: 'Yêu cầu phân đoạn đồng thời tối đa',
      }),
      value: 0,
      type: 'number',
      description: i18n.translate('data.advancedSettings.courier.maxRequestsText', {
        defaultMessage:
          'Kiểm soát cài đặt {maxRequestsLink} được sử dụng cho các yêu cầu _msearch được gửi bởi Trang tổng quan OpenSearch. ' +
          'Đặt thành 0 để tắt cấu hình này và sử dụng mặc định OpenSearch.',
        values: {
          maxRequestsLink: `<a href="https://opensearch.org/docs/latest/opensearch/query-dsl/full-text/#multi-match"
            target="_blank" rel="noopener noreferrer" >max_concurrent_shard_requests</a>`,
        },
      }),
      category: ['search'],
      schema: schema.number(),
    },
    [UI_SETTINGS.COURIER_BATCH_SEARCHES]: {
      name: i18n.translate('data.advancedSettings.courier.batchSearchesTitle', {
        defaultMessage: 'Tìm kiếm đồng thời hàng loạt',
      }),
      value: false,
      type: 'boolean',
      description: i18n.translate('data.advancedSettings.courier.batchSearchesText', {
        defaultMessage: `Khi bị tắt, các bảng tổng quan sẽ tải riêng lẻ và các yêu cầu tìm kiếm sẽ chấm dứt khi người dùng di chuyển\n đi hoặc cập nhật truy vấn. Khi được bật, các bảng điều khiển trang tổng quan sẽ tải cùng nhau khi tất cả dữ liệu được tải và\n các tìm kiếm sẽ không kết thúc.`,
      }),
      category: ['search'],
      schema: schema.boolean(),
    },
    [UI_SETTINGS.SEARCH_INCLUDE_FROZEN]: {
      name: 'Tìm kiếm trong chỉ mục cố định',
      description: `Sẽ bao gồm các <a href="https://opensearch.org/docs/latest/opensearch/index-data"
        target="_blank" rel="noopener noreferrer">chỉ mục cố định</a> trong kết quả nếu được bật. Tìm kiếm thông qua các chỉ mục cố định có thể làm tăng thời gian tìm kiếm.`,
      value: false,
      category: ['search'],
      schema: schema.boolean(),
    },
    [UI_SETTINGS.HISTOGRAM_BAR_TARGET]: {
      name: i18n.translate('data.advancedSettings.histogram.barTargetTitle', {
        defaultMessage: 'Thanh mục tiêu',
      }),
      value: 50,
      description: i18n.translate('data.advancedSettings.histogram.barTargetText', {
        defaultMessage:
          'Cố gắng tạo xung quanh nhiều thanh này khi sử dụng khoảng thời gian \"auto\" trong biểu đồ ngày',
      }),
      schema: schema.number(),
    },
    [UI_SETTINGS.HISTOGRAM_MAX_BARS]: {
      name: i18n.translate('data.advancedSettings.histogram.maxBarsTitle', {
        defaultMessage: 'Thanh tối đa',
      }),
      value: 100,
      description: i18n.translate('data.advancedSettings.histogram.maxBarsText', {
        defaultMessage:
          'Không bao giờ hiển thị nhiều hơn nhiều thanh này trong biểu đồ ngày, giá trị tỷ lệ nếu cần',
      }),
      schema: schema.number(),
    },
    [UI_SETTINGS.HISTORY_LIMIT]: {
      name: i18n.translate('data.advancedSettings.historyLimitTitle', {
        defaultMessage: 'Giới hạn lịch sử',
      }),
      value: 10,
      description: i18n.translate('data.advancedSettings.historyLimitText', {
        defaultMessage:
          'Trong các trường có lịch sử (ví dụ: đầu vào truy vấn), hãy hiển thị nhiều giá trị gần đây này',
      }),
      schema: schema.number(),
    },
    [UI_SETTINGS.SHORT_DOTS_ENABLE]: {
      name: i18n.translate('data.advancedSettings.shortenFieldsTitle', {
        defaultMessage: 'Rút ngắn các vùng',
      }),
      value: false,
      description: i18n.translate('data.advancedSettings.shortenFieldsText', {
        defaultMessage: 'Rút ngắn các trường dài, ví dụ thay vì foo.bar.baz, hãy hiển thị f.b.baz',
      }),
      schema: schema.boolean(),
    },
    [UI_SETTINGS.FORMAT_DEFAULT_TYPE_MAP]: {
      name: i18n.translate('data.advancedSettings.format.defaultTypeMapTitle', {
        defaultMessage: 'Tên định dạng loại vùng',
      }),
      value: `{
  "ip": { "id": "ip", "params": {} },
  "date": { "id": "date", "params": {} },
  "date_nanos": { "id": "date_nanos", "params": {}, "opensearch": true },
  "number": { "id": "number", "params": {} },
  "boolean": { "id": "boolean", "params": {} },
  "_source": { "id": "_source", "params": {} },
  "_default_": { "id": "string", "params": {} }
}`,
      type: 'json',
      description: i18n.translate('data.advancedSettings.format.defaultTypeMapText', {
        defaultMessage:
          'Ánh xạ tên định dạng sẽ sử dụng theo mặc định cho từng loại trường.' +
          '{defaultFormat} được sử dụng nếu loại trường không được đề cập rõ ràng',
        values: {
          defaultFormat: '"_default_"',
        },
      }),
      schema: schema.object({
        ip: schema.object({
          id: schema.string(),
          params: schema.object({}),
        }),
        date: schema.object({
          id: schema.string(),
          params: schema.object({}),
        }),
        date_nanos: schema.object({
          id: schema.string(),
          params: schema.object({}),
          opensearch: schema.boolean(),
        }),
        number: schema.object({
          id: schema.string(),
          params: schema.object({}),
        }),
        boolean: schema.object({
          id: schema.string(),
          params: schema.object({}),
        }),
        _source: schema.object({
          id: schema.string(),
          params: schema.object({}),
        }),
        _default_: schema.object({
          id: schema.string(),
          params: schema.object({}),
        }),
      }),
    },
    [UI_SETTINGS.FORMAT_NUMBER_DEFAULT_PATTERN]: {
      name: i18n.translate('data.advancedSettings.format.numberFormatTitle', {
        defaultMessage: 'Định dạng số',
      }),
      value: '0,0.[000]',
      type: 'string',
      description: i18n.translate('data.advancedSettings.format.numberFormatText', {
        defaultMessage: '{numeralFormatLink} mặc định cho định dạng "số".',
        description:
          'Part of composite text: data.advancedSettings.format.numberFormatText + ' +
          'data.advancedSettings.format.numberFormat.numeralFormatLinkText',
        values: {
          numeralFormatLink:
            '<a href="http://numeraljs.com/" target="_blank" rel="noopener noreferrer">' +
            i18n.translate('data.advancedSettings.format.numberFormat.numeralFormatLinkText', {
              defaultMessage: 'Định dạng số',
            }) +
            '</a>',
        },
      }),
      schema: schema.string(),
    },
    [UI_SETTINGS.FORMAT_PERCENT_DEFAULT_PATTERN]: {
      name: i18n.translate('data.advancedSettings.format.percentFormatTitle', {
        defaultMessage: 'Định dạng phần trăm',
      }),
      value: '0,0.[000]%',
      type: 'string',
      description: i18n.translate('data.advancedSettings.format.percentFormatText', {
        defaultMessage: '{numeralFormatLink} mặc định cho định dạng "phần trăm".',
        description:
          'Part of composite text: data.advancedSettings.format.percentFormatText + ' +
          'data.advancedSettings.format.percentFormat.numeralFormatLinkText',
        values: {
          numeralFormatLink:
            '<a href="http://numeraljs.com/" target="_blank" rel="noopener noreferrer">' +
            i18n.translate('data.advancedSettings.format.percentFormat.numeralFormatLinkText', {
              defaultMessage: 'Định dạng số',
            }) +
            '</a>',
        },
      }),
      schema: schema.string(),
    },
    [UI_SETTINGS.FORMAT_BYTES_DEFAULT_PATTERN]: {
      name: i18n.translate('data.advancedSettings.format.bytesFormatTitle', {
        defaultMessage: 'Định dạng Bytes',
      }),
      value: '0,0.[0]b',
      type: 'string',
      description: i18n.translate('data.advancedSettings.format.bytesFormatText', {
        defaultMessage: '{numeralFormatLink} mặc định cho định dạng "Byte".',
        description:
          'Part of composite text: data.advancedSettings.format.bytesFormatText + ' +
          'data.advancedSettings.format.bytesFormat.numeralFormatLinkText',
        values: {
          numeralFormatLink:
            '<a href="http://numeraljs.com/" target="_blank" rel="noopener noreferrer">' +
            i18n.translate('data.advancedSettings.format.bytesFormat.numeralFormatLinkText', {
              defaultMessage: 'Định dạng số',
            }) +
            '</a>',
        },
      }),
      schema: schema.string(),
    },
    [UI_SETTINGS.FORMAT_CURRENCY_DEFAULT_PATTERN]: {
      name: i18n.translate('data.advancedSettings.format.currencyFormatTitle', {
        defaultMessage: 'Định dạng tiền tệ',
      }),
      value: '($0,0.[00])',
      type: 'string',
      description: i18n.translate('data.advancedSettings.format.currencyFormatText', {
        defaultMessage: '{numeralFormatLink} mặc định cho định dạng "tiền tệ"',
        description:
          'Part of composite text: data.advancedSettings.format.currencyFormatText + ' +
          'data.advancedSettings.format.currencyFormat.numeralFormatLinkText',
        values: {
          numeralFormatLink:
            '<a href="http://numeraljs.com/" target="_blank" rel="noopener noreferrer">' +
            i18n.translate('data.advancedSettings.format.currencyFormat.numeralFormatLinkText', {
              defaultMessage: 'Định dạng số',
            }) +
            '</a>',
        },
      }),
      schema: schema.string(),
    },
    [UI_SETTINGS.FORMAT_NUMBER_DEFAULT_LOCALE]: {
      name: i18n.translate('data.advancedSettings.format.formattingLocaleTitle', {
        defaultMessage: 'Định dạng ngôn ngữ',
      }),
      value: 'en',
      type: 'select',
      options: numeralLanguageIds,
      optionLabels: Object.fromEntries(
        numeralLanguages.map((language: Record<string, any>) => [language.id, language.name])
      ),
      description: i18n.translate('data.advancedSettings.format.formattingLocaleText', {
        defaultMessage: `Ngôn ngữ dành cho {numeralLanguageLink}`,
        description:
          'Part of composite text: data.advancedSettings.format.formattingLocale.numeralLanguageLinkText + ' +
          'data.advancedSettings.format.formattingLocaleText',
        values: {
          numeralLanguageLink:
            '<a href="http://numeraljs.com/" target="_blank" rel="noopener noreferrer">' +
            i18n.translate(
              'data.advancedSettings.format.formattingLocale.numeralLanguageLinkText',
              {
                defaultMessage: 'ngôn ngữ số',
              }
            ) +
            '</a>',
        },
      }),
      schema: schema.string(),
    },
    [UI_SETTINGS.TIMEPICKER_REFRESH_INTERVAL_DEFAULTS]: {
      name: i18n.translate('data.advancedSettings.timepicker.refreshIntervalDefaultsTitle', {
        defaultMessage: 'Khoảng thời gian làm mới bộ lọc thời gian',
      }),
      value: `{
  "pause": false,
  "value": 0
}`,
      type: 'json',
      description: i18n.translate('data.advancedSettings.timepicker.refreshIntervalDefaultsText', {
        defaultMessage: `Khoảng thời gian làm mới mặc định của bộ lọc thời gian. \"giá trị\" cần được chỉ định theo mili giây.`,
      }),
      requiresPageReload: true,
      schema: schema.object({
        pause: schema.boolean(),
        value: schema.number(),
      }),
    },
    [UI_SETTINGS.TIMEPICKER_TIME_DEFAULTS]: {
      name: i18n.translate('data.advancedSettings.timepicker.timeDefaultsTitle', {
        defaultMessage: 'Bộ lọc thời gian mặc định',
      }),
      value: `{
  "from": "now-15m",
  "to": "now"
}`,
      type: 'json',
      description: i18n.translate('data.advancedSettings.timepicker.timeDefaultsText', {
        defaultMessage:
          'Lựa chọn bộ lọc thời gian sẽ sử dụng khi Bảng thông tin OpenSearch được khởi động mà không có bộ lọc thời gian',
      }),
      requiresPageReload: true,
      schema: schema.object({
        from: schema.string(),
        to: schema.string(),
      }),
    },
    [UI_SETTINGS.TIMEPICKER_QUICK_RANGES]: {
      name: i18n.translate('data.advancedSettings.timepicker.quickRangesTitle', {
        defaultMessage: 'Phạm vi nhanh của bộ lọc thời gian',
      }),
      value: JSON.stringify(
        [
          {
            from: 'now/d',
            to: 'now/d',
            display: i18n.translate('data.advancedSettings.timepicker.today', {
              defaultMessage: 'Hôm nay',
            }),
          },
          {
            from: 'now/w',
            to: 'now/w',
            display: i18n.translate('data.advancedSettings.timepicker.thisWeek', {
              defaultMessage: 'Tuần này',
            }),
          },
          {
            from: 'now-15m',
            to: 'now',
            display: i18n.translate('data.advancedSettings.timepicker.last15Minutes', {
              defaultMessage: '15 phút vừa qua',
            }),
          },
          {
            from: 'now-30m',
            to: 'now',
            display: i18n.translate('data.advancedSettings.timepicker.last30Minutes', {
              defaultMessage: '30 phút vừa qua',
            }),
          },
          {
            from: 'now-1h',
            to: 'now',
            display: i18n.translate('data.advancedSettings.timepicker.last1Hour', {
              defaultMessage: '1 tiếng vừa qua',
            }),
          },
          {
            from: 'now-24h',
            to: 'now',
            display: i18n.translate('data.advancedSettings.timepicker.last24Hours', {
              defaultMessage: '24 tiếng vừa qua',
            }),
          },
          {
            from: 'now-7d',
            to: 'now',
            display: i18n.translate('data.advancedSettings.timepicker.last7Days', {
              defaultMessage: '7 ngày vừa qua',
            }),
          },
          {
            from: 'now-30d',
            to: 'now',
            display: i18n.translate('data.advancedSettings.timepicker.last30Days', {
              defaultMessage: '30 ngày vừa qua',
            }),
          },
          {
            from: 'now-90d',
            to: 'now',
            display: i18n.translate('data.advancedSettings.timepicker.last90Days', {
              defaultMessage: '90 ngày vừa qua',
            }),
          },
          {
            from: 'now-1y',
            to: 'now',
            display: i18n.translate('data.advancedSettings.timepicker.last1Year', {
              defaultMessage: '1 năm vừa qua',
            }),
          },
        ],
        null,
        2
      ),
      type: 'json',
      description: i18n.translate('data.advancedSettings.timepicker.quickRangesText', {
        defaultMessage:
          'Danh sách các phạm vi sẽ hiển thị trong phần Nhanh của bộ lọc thời gian. Đây phải là một mảng các đối tượng, ' +
          'với mỗi đối tượng chứa "từ", "đến" (xem {acceptedFormatsLink}) và' +
          '"hiển thị" (tiêu đề sẽ được hiển thị).',
        description:
          'Part of composite text: data.advancedSettings.timepicker.quickRangesText + ' +
          'data.advancedSettings.timepicker.quickRanges.acceptedFormatsLinkText',
        values: {
          acceptedFormatsLink:
            `<a href="https://opensearch.org/docs/latest/opensearch/units"
            target="_blank" rel="noopener noreferrer">` +
            i18n.translate('data.advancedSettings.timepicker.quickRanges.acceptedFormatsLinkText', {
              defaultMessage: 'định dạng được chấp nhận',
            }) +
            '</a>',
        },
      }),
      schema: schema.arrayOf(
        schema.object({
          from: schema.string(),
          to: schema.string(),
          display: schema.string(),
        })
      ),
    },
    [UI_SETTINGS.INDEXPATTERN_PLACEHOLDER]: {
      name: i18n.translate('data.advancedSettings.indexPatternPlaceholderTitle', {
        defaultMessage: 'Phần giữ chỗ của mẫu chỉ mục',
      }),
      value: '',
      description: i18n.translate('data.advancedSettings.indexPatternPlaceholderText', {
        defaultMessage:
          'Trình giữ chỗ cho trường \"Tên mẫu chỉ mục\" trong \"Quản lý > Mẫu chỉ mục > Tạo mẫu chỉ mục\".',
      }),
      schema: schema.string(),
    },
    [UI_SETTINGS.FILTERS_PINNED_BY_DEFAULT]: {
      name: i18n.translate('data.advancedSettings.pinFiltersTitle', {
        defaultMessage: 'Bộ lọc ghim theo mặc định',
      }),
      value: false,
      description: i18n.translate('data.advancedSettings.pinFiltersText', {
        defaultMessage: 'Theo mặc định, các bộ lọc có nên có trạng thái chung (được ghim) hay không',
      }),
      schema: schema.boolean(),
    },
    [UI_SETTINGS.FILTERS_EDITOR_SUGGEST_VALUES]: {
      name: i18n.translate('data.advancedSettings.suggestFilterValuesTitle', {
        defaultMessage: 'Giá trị đề xuất của trình chỉnh sửa bộ lọc',
        description: '"Filter editor" refers to the UI you create filters in.',
      }),
      value: true,
      description: i18n.translate('data.advancedSettings.suggestFilterValuesText', {
        defaultMessage:
          'Đặt thuộc tính này thành false để ngăn trình chỉnh sửa bộ lọc đề xuất giá trị cho các trường.',
      }),
      schema: schema.boolean(),
    },
  };
}
