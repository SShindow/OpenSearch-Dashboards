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

import {
  EuiButtonEmpty,
  EuiForm,
  EuiFormRow,
  EuiLink,
  EuiPopover,
  EuiPopoverTitle,
  EuiSpacer,
  EuiSwitch,
  EuiText,
  PopoverAnchorPosition,
} from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';
import React, { useState } from 'react';
import { useOpenSearchDashboards } from '../../../../opensearch_dashboards_react/public';

interface Props {
  language: string;
  onSelectLanguage: (newLanguage: string) => void;
  anchorPosition?: PopoverAnchorPosition;
}

export function QueryLanguageSwitcher(props: Props) {
  const osdDQLDocs = useOpenSearchDashboards().services.docLinks?.links.opensearchDashboards.dql
    .base;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const luceneLabel = (
    <FormattedMessage id="data.query.queryBar.luceneLanguageName" defaultMessage="Lucene" />
  );
  const dqlLabel = (
    <FormattedMessage id="data.query.queryBar.dqlLanguageName" defaultMessage="DQL" />
  );
  const dqlFullName = (
    <FormattedMessage
      id="data.query.queryBar.dqlFullLanguageName"
      defaultMessage="Ngôn ngữ truy vấn của bảng điều khiển OpenSearch"
    />
  );

  const button = (
    <EuiButtonEmpty
      size="xs"
      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      className="euiFormControlLayout__append dqlQueryBar__languageSwitcherButton"
      data-test-subj={'switchQueryLanguageButton'}
    >
      {props.language === 'lucene' ? luceneLabel : dqlLabel}
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover
      id="queryLanguageSwitcherPopover"
      anchorClassName="euiFormControlLayout__append"
      ownFocus
      anchorPosition={props.anchorPosition || 'downRight'}
      button={button}
      isOpen={isPopoverOpen}
      closePopover={() => setIsPopoverOpen(false)}
      repositionOnScroll
    >
      <EuiPopoverTitle>
        <FormattedMessage
          id="data.query.queryBar.syntaxOptionsTitle"
          defaultMessage="Tùy chọn cú pháp"
        />
      </EuiPopoverTitle>
      <div style={{ width: '350px' }}>
        <EuiText>
          <p>
            <FormattedMessage
              id="data.query.queryBar.syntaxOptionsDescription"
              defaultMessage="{docsLink} (DQL) cung cấp cú pháp truy vấn đơn giản hóa và hỗ trợ cho các trường theo tập lệnh. Nếu bạn tắt DQL thì Bảng thông tin OpenSearch sẽ sử dụng Lucene."
              values={{
                docsLink: (
                  <EuiLink href={osdDQLDocs} target="_blank">
                    {dqlFullName}
                  </EuiLink>
                ),
              }}
            />
          </p>
        </EuiText>

        <EuiSpacer size="m" />

        <EuiForm>
          <EuiFormRow label={dqlFullName}>
            <EuiSwitch
              id="queryEnhancementOptIn"
              name="popswitch"
              label={
                props.language === 'kuery' ? (
                  <FormattedMessage id="data.query.queryBar.dqlOnLabel" defaultMessage="Bật" />
                ) : (
                  <FormattedMessage id="data.query.queryBar.dqlOffLabel" defaultMessage="Tắt" />
                )
              }
              checked={props.language === 'kuery'}
              onChange={() => {
                const newLanguage = props.language === 'lucene' ? 'kuery' : 'lucene';
                props.onSelectLanguage(newLanguage);
              }}
              data-test-subj="languageToggle"
            />
          </EuiFormRow>
        </EuiForm>
      </div>
    </EuiPopover>
  );
}
