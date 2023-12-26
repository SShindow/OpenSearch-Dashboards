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

import { schema } from '@osd/config-schema';
import { i18n } from '@osd/i18n';
import { UiSettingsParams } from '../../../types';

export const getStateSettings = (): Record<string, UiSettingsParams> => {
  return {
    'state:storeInSessionStorage': {
      name: i18n.translate('core.ui_settings.params.storeUrlTitle', {
        defaultMessage: 'Lưu trữ URL trong bộ nhớ phiên',
      }),
      value: false,
      description: i18n.translate('core.ui_settings.params.storeUrlText', {
        defaultMessage:
          'URL đôi khi có thể trở nên quá lớn khiến một số trình duyệt không thể xử lý được. ' +
          'Để chống lại điều này, chúng tôi đang kiểm tra xem việc lưu trữ các phần của URL trong bộ nhớ phiên có thể giúp ích hay không. ' +
          'Xin vui lòng cho chúng tôi biết nó diễn ra như thế nào!',
      }),
      schema: schema.boolean(),
    },
  };
};
