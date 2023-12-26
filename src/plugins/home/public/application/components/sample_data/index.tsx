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

/*
 * The UI and related logic for the welcome screen that *should* show only
 * when it is enabled (the default) and there is no OpenSearch Dashboards-consumed data
 * in OpenSearch.
 */

import React from 'react';
import {
  // @ts-ignore
  EuiCard,
  EuiButton,
  EuiButtonEmpty,
} from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';
import { getServices } from '../../opensearch_dashboards_services';

interface Props {
  urlBasePath: string;
  onDecline: () => void;
  onConfirm: () => void;
}

export function SampleDataCard({ urlBasePath, onDecline, onConfirm }: Props) {
  const IS_DARK_THEME = getServices().uiSettings.get('theme:darkMode');
  const cardGraphicFile = !IS_DARK_THEME
    ? 'illustration_integrations_lightmode.png'
    : 'illustration_integrations_darkmode.png';
  const cardGraphicURL = `${urlBasePath}/plugins/home/assets/common/${cardGraphicFile}`;

  return (
    <EuiCard
      image={cardGraphicURL}
      textAlign="left"
      title={
        <FormattedMessage id="home.letsStartTitle" defaultMessage="Bắt đầu bằng cách thêm dữ liệu của bạn" />
      }
      description={
        <FormattedMessage
          id="home.letsStartDescription"
          defaultMessage="Thêm dữ liệu vào cụm của bạn từ bất kỳ nguồn nào, sau đó phân tích và trực quan dữ liệu đó theo thời gian thực. Sử dụng các giải pháp của chúng tôi để thêm tính năng tìm kiếm ở mọi nơi, quan sát hệ sinh thái của bạn và bảo vệ khỏi các mối đe dọa bảo mật."
        />
      }
      footer={
        <footer>
          <EuiButton fill className="homWelcome__footerAction" onClick={onConfirm}>
            <FormattedMessage id="home.tryButtonLabel" defaultMessage="Thêm dữ liệu" />
          </EuiButton>
          <EuiButtonEmpty
            className="homWelcome__footerAction"
            onClick={onDecline}
            data-test-subj="skipWelcomeScreen"
          >
            <FormattedMessage id="home.exploreButtonLabel" defaultMessage="Khám phá theo cách riêng của tôi" />
          </EuiButtonEmpty>
        </footer>
      }
    />
  );
}
