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

import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiCard,
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiToolTip,
} from '@elastic/eui';

export const INSTALLED_STATUS = 'installed';
export const UNINSTALLED_STATUS = 'not_installed';

import { i18n } from '@osd/i18n';
import { FormattedMessage } from '@osd/i18n/react';

import { SampleDataViewDataButton } from './sample_data_view_data_button';

export class SampleDataSetCard extends React.Component {
  isInstalled = () => {
    if (this.props.status === INSTALLED_STATUS) {
      return true;
    }

    return false;
  };

  install = () => {
    this.props.onInstall(this.props.id, this.props.dataSourceId);
  };

  uninstall = () => {
    this.props.onUninstall(this.props.id, this.props.dataSourceId);
  };

  renderBtn = () => {
    switch (this.props.status) {
      case INSTALLED_STATUS:
        return (
          <EuiFlexGroup gutterSize="none" justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                isLoading={this.props.isProcessing}
                onClick={this.uninstall}
                color="danger"
                data-test-subj={`removeSampleDataSet${this.props.id}`}
                flush="left"
                aria-label={
                  this.props.isProcessing
                    ? i18n.translate('home.sampleDataSetCard.removingButtonAriaLabel', {
                        defaultMessage: 'Removing {datasetName}',
                        values: {
                          datasetName: this.props.name,
                        },
                      })
                    : i18n.translate('home.sampleDataSetCard.removeButtonAriaLabel', {
                        defaultMessage: 'Remove {datasetName}',
                        values: {
                          datasetName: this.props.name,
                        },
                      })
                }
              >
                {this.props.isProcessing ? (
                  <FormattedMessage
                    id="home.sampleDataSetCard.removingButtonLabel"
                    defaultMessage="Đang xóa"
                  />
                ) : (
                  <FormattedMessage
                    id="home.sampleDataSetCard.removeButtonLabel"
                    defaultMessage="Xóa"
                  />
                )}
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <SampleDataViewDataButton
                id={this.props.id}
                name={this.props.name}
                overviewDashboard={this.props.overviewDashboard}
                appLinks={this.props.appLinks}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        );

      case UNINSTALLED_STATUS:
        return (
          <EuiFlexGroup justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiButton
                isLoading={this.props.isProcessing}
                onClick={this.install}
                data-test-subj={`addSampleDataSet${this.props.id}`}
                aria-label={
                  this.props.isProcessing
                    ? i18n.translate('home.sampleDataSetCard.addingButtonAriaLabel', {
                        defaultMessage: 'Adding {datasetName}',
                        values: {
                          datasetName: this.props.name,
                        },
                      })
                    : i18n.translate('home.sampleDataSetCard.addButtonAriaLabel', {
                        defaultMessage: 'Add {datasetName}',
                        values: {
                          datasetName: this.props.name,
                        },
                      })
                }
              >
                {this.props.isProcessing ? (
                  <FormattedMessage
                    id="home.sampleDataSetCard.addingButtonLabel"
                    defaultMessage="Đang thêm"
                  />
                ) : (
                  <FormattedMessage
                    id="home.sampleDataSetCard.addButtonLabel"
                    defaultMessage="Thêm dữ liệu"
                  />
                )}
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        );

      default: {
        return (
          <EuiFlexGroup justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiToolTip
                position="top"
                content={
                  <p>
                    <FormattedMessage
                      id="home.sampleDataSetCard.default.unableToVerifyErrorMessage"
                      defaultMessage="Unable to verify dataset status, error: {statusMsg}"
                      values={{ statusMsg: this.props.statusMsg }}
                    />
                  </p>
                }
              >
                <EuiButton
                  isDisabled
                  data-test-subj={`addSampleDataSet${this.props.id}`}
                  aria-label={i18n.translate('home.sampleDataSetCard.default.addButtonAriaLabel', {
                    defaultMessage: 'Add {datasetName}',
                    values: {
                      datasetName: this.props.name,
                    },
                  })}
                >
                  <FormattedMessage
                    id="home.sampleDataSetCard.default.addButtonLabel"
                    defaultMessage="Thêm dữ liệu"
                  />
                </EuiButton>
              </EuiToolTip>
            </EuiFlexItem>
          </EuiFlexGroup>
        );
      }
    }
  };

  render() {
    return (
      <EuiCard
        textAlign="left"
        className="homSampleDataSetCard"
        image={this.props.previewUrl}
        title={this.props.name}
        description={this.props.description}
        betaBadgeLabel={this.isInstalled() ? 'INSTALLED' : null}
        footer={this.renderBtn()}
        data-test-subj={`sampleDataSetCard${this.props.id}`}
      />
    );
  }
}

SampleDataSetCard.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  overviewDashboard: PropTypes.string.isRequired,
  appLinks: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  status: PropTypes.oneOf([INSTALLED_STATUS, UNINSTALLED_STATUS, 'unknown']).isRequired,
  isProcessing: PropTypes.bool.isRequired,
  statusMsg: PropTypes.string,
  previewUrl: PropTypes.string.isRequired,
  onInstall: PropTypes.func.isRequired,
  onUninstall: PropTypes.func.isRequired,
};
