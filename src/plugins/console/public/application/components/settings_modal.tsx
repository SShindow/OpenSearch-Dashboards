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

import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { i18n } from '@osd/i18n';
import { FormattedMessage } from '@osd/i18n/react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldNumber,
  EuiFormRow,
  EuiCheckboxGroup,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSwitch,
} from '@elastic/eui';

import { DevToolsSettings } from '../../services';

export type AutocompleteOptions = 'fields' | 'indices' | 'templates';

interface Props {
  onSaveSettings: (newSettings: DevToolsSettings) => void;
  onClose: () => void;
  refreshAutocompleteSettings: (selectedSettings: any) => void;
  settings: DevToolsSettings;
}

export function DevToolsSettingsModal(props: Props) {
  const [fontSize, setFontSize] = useState(props.settings.fontSize);
  const [wrapMode, setWrapMode] = useState(props.settings.wrapMode);
  const [fields, setFields] = useState(props.settings.autocomplete.fields);
  const [indices, setIndices] = useState(props.settings.autocomplete.indices);
  const [templates, setTemplates] = useState(props.settings.autocomplete.templates);
  const [polling, setPolling] = useState(props.settings.polling);
  const [tripleQuotes, setTripleQuotes] = useState(props.settings.tripleQuotes);

  const autoCompleteCheckboxes = [
    {
      id: 'fields',
      label: i18n.translate('console.settingsPage.fieldsLabelText', {
        defaultMessage: 'Fields',
      }),
      stateSetter: setFields,
    },
    {
      id: 'indices',
      label: i18n.translate('console.settingsPage.indicesAndAliasesLabelText', {
        defaultMessage: 'Indices & Aliases',
      }),
      stateSetter: setIndices,
    },
    {
      id: 'templates',
      label: i18n.translate('console.settingsPage.templatesLabelText', {
        defaultMessage: 'Templates',
      }),
      stateSetter: setTemplates,
    },
  ];

  const checkboxIdToSelectedMap = {
    fields,
    indices,
    templates,
  };

  const onAutocompleteChange = (optionId: AutocompleteOptions) => {
    const option = _.find(autoCompleteCheckboxes, (item) => item.id === optionId);
    if (option) {
      option.stateSetter(!checkboxIdToSelectedMap[optionId]);
    }
  };

  function saveSettings() {
    props.onSaveSettings({
      fontSize,
      wrapMode,
      autocomplete: {
        fields,
        indices,
        templates,
      },
      polling,
      tripleQuotes,
    });
  }

  // It only makes sense to show polling options if the user needs to fetch any data.
  const pollingFields =
    fields || indices || templates ? (
      <Fragment>
        <EuiFormRow
          label={
            <FormattedMessage
              id="console.settingsPage.refreshingDataLabel"
              defaultMessage="Làm mới đề xuất tự động hoàn thành"
            />
          }
          helpText={
            <FormattedMessage
              id="console.settingsPage.refreshingDataDescription"
              defaultMessage="Bảng điều khiển làm mới các đề xuất tự động hoàn thành bằng cách truy vấn OpenSearch. 
              Làm mới tự động có thể là một vấn đề nếu bạn có một cụm lớn hoặc nếu bạn có những hạn chế về mạng."
            />
          }
        >
          <EuiSwitch
            checked={polling}
            data-test-subj="autocompletePolling"
            id="autocompletePolling"
            label={
              <FormattedMessage
                defaultMessage="Tự động làm mới các đề xuất tự động hoàn thành"
                id="console.settingsPage.pollingLabelText"
              />
            }
            onChange={(e) => setPolling(e.target.checked)}
          />
        </EuiFormRow>

        <EuiButton
          data-test-subj="autocompletePolling"
          id="autocompletePolling"
          onClick={() => {
            // Only refresh the currently selected settings.
            props.refreshAutocompleteSettings({
              fields,
              indices,
              templates,
            });
          }}
        >
          <FormattedMessage
            defaultMessage="Làm mới đề xuất tự động hoàn thành"
            id="console.settingsPage.refreshButtonLabel"
          />
        </EuiButton>
      </Fragment>
    ) : undefined;

  return (
    <EuiModal
      data-test-subj="devToolsSettingsModal"
      className="conApp__settingsModal"
      onClose={props.onClose}
    >
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <FormattedMessage id="console.settingsPage.pageTitle" defaultMessage="Cài đặt bảng điều khiển" />
        </EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <EuiFormRow
          label={
            <FormattedMessage id="console.settingsPage.fontSizeLabel" defaultMessage="Cỡ chữ" />
          }
        >
          <EuiFieldNumber
            autoFocus
            data-test-subj="setting-font-size-input"
            value={fontSize}
            min={6}
            max={50}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!val) return;
              setFontSize(val);
            }}
          />
        </EuiFormRow>

        <EuiFormRow>
          <EuiSwitch
            checked={wrapMode}
            data-test-subj="settingsWrapLines"
            id="wrapLines"
            label={
              <FormattedMessage
                defaultMessage="Xếp những hàng dài"
                id="console.settingsPage.wrapLongLinesLabelText"
              />
            }
            onChange={(e) => setWrapMode(e.target.checked)}
          />
        </EuiFormRow>

        <EuiFormRow
          label={
            <FormattedMessage
              id="console.settingsPage.jsonSyntaxLabel"
              defaultMessage="Cú pháp JSON"
            />
          }
        >
          <EuiSwitch
            checked={tripleQuotes}
            data-test-subj="tripleQuotes"
            id="tripleQuotes"
            label={
              <FormattedMessage
                defaultMessage="Sử dụng dấu ngoặc kép trong ngăn đầu ra"
                id="console.settingsPage.tripleQuotesMessage"
              />
            }
            onChange={(e) => setTripleQuotes(e.target.checked)}
          />
        </EuiFormRow>

        <EuiFormRow
          labelType="legend"
          label={
            <FormattedMessage
              id="console.settingsPage.autocompleteLabel"
              defaultMessage="Tự động hoàn thành"
            />
          }
        >
          <EuiCheckboxGroup
            options={autoCompleteCheckboxes.map((opts) => {
              const { stateSetter, ...rest } = opts;
              return rest;
            })}
            idToSelectedMap={checkboxIdToSelectedMap}
            onChange={(e: any) => {
              onAutocompleteChange(e as AutocompleteOptions);
            }}
          />
        </EuiFormRow>

        {pollingFields}
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButtonEmpty data-test-subj="settingsCancelButton" onClick={props.onClose}>
          <FormattedMessage id="console.settingsPage.cancelButtonLabel" defaultMessage="Hủy bỏ" />
        </EuiButtonEmpty>

        <EuiButton fill data-test-subj="settings-save-button" onClick={saveSettings}>
          <FormattedMessage id="console.settingsPage.saveButtonLabel" defaultMessage="Lưu" />
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
}
