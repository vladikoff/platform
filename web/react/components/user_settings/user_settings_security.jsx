// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

var SettingItemMin = require('../setting_item_min.jsx');
var SettingItemMax = require('../setting_item_max.jsx');
var AccessHistoryModal = require('../access_history_modal.jsx');
var ActivityLogModal = require('../activity_log_modal.jsx');
var Client = require('../../utils/client.jsx');
var AsyncClient = require('../../utils/async_client.jsx');
var Constants = require('../../utils/constants.jsx');

export default class SecurityTab extends React.Component {
    constructor(props) {
        super(props);

        this.showAccessHistoryModal = this.showAccessHistoryModal.bind(this);
        this.showActivityLogModal = this.showActivityLogModal.bind(this);
        this.hideModals = this.hideModals.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.updateCurrentPassword = this.updateCurrentPassword.bind(this);
        this.updateNewPassword = this.updateNewPassword.bind(this);
        this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
        this.setupInitialState = this.setupInitialState.bind(this);

        const state = this.setupInitialState();
        state.showAccessHistoryModal = false;
        state.showActivityLogModal = false;
        this.state = state;
    }
    showAccessHistoryModal() {
        this.props.setEnforceFocus(false);
        this.setState({showAccessHistoryModal: true});
    }
    showActivityLogModal() {
        this.props.setEnforceFocus(false);
        this.setState({showActivityLogModal: true});
    }
    hideModals() {
        this.props.setEnforceFocus(true);
        this.setState({
            showAccessHistoryModal: false,
            showActivityLogModal: false
        });
    }
    submitPassword(e) {
        e.preventDefault();

        var user = this.props.user;
        var currentPassword = this.state.currentPassword;
        var newPassword = this.state.newPassword;
        var confirmPassword = this.state.confirmPassword;

        if (currentPassword === '') {
            this.setState({passwordError: 'Please enter your current password', serverError: ''});
            return;
        }

        if (newPassword.length < 5) {
            this.setState({passwordError: 'New passwords must be at least 5 characters', serverError: ''});
            return;
        }

        if (newPassword !== confirmPassword) {
            this.setState({passwordError: 'The new passwords you entered do not match', serverError: ''});
            return;
        }

        var data = {};
        data.user_id = user.id;
        data.current_password = currentPassword;
        data.new_password = newPassword;

        Client.updatePassword(data,
            function success() {
                this.props.updateSection('');
                AsyncClient.getMe();
                this.setState(this.setupInitialState());
            }.bind(this),
            function fail(err) {
                var state = this.setupInitialState();
                if (err.message) {
                    state.serverError = err.message;
                } else {
                    state.serverError = err;
                }
                state.passwordError = '';
                this.setState(state);
            }.bind(this)
        );
    }
    updateCurrentPassword(e) {
        this.setState({currentPassword: e.target.value});
    }
    updateNewPassword(e) {
        this.setState({newPassword: e.target.value});
    }
    updateConfirmPassword(e) {
        this.setState({confirmPassword: e.target.value});
    }
    setupInitialState() {
        return {currentPassword: '', newPassword: '', confirmPassword: ''};
    }
    render() {
        var serverError;
        if (this.state.serverError) {
            serverError = this.state.serverError;
        }
        var passwordError;
        if (this.state.passwordError) {
            passwordError = this.state.passwordError;
        }

        var updateSectionStatus;
        var passwordSection;
        if (this.props.activeSection === 'password') {
            var inputs = [];
            var submit = null;

            if (this.props.user.auth_service === '') {
                inputs.push(
                    <div
                        key='currentPasswordUpdateForm'
                        className='form-group'
                    >
                        <label className='col-sm-5 control-label'>Current Password</label>
                        <div className='col-sm-7'>
                            <input
                                className='form-control'
                                type='password'
                                onChange={this.updateCurrentPassword}
                                value={this.state.currentPassword}
                            />
                        </div>
                    </div>
                );
                inputs.push(
                    <div
                        key='newPasswordUpdateForm'
                        className='form-group'
                    >
                        <label className='col-sm-5 control-label'>New Password</label>
                        <div className='col-sm-7'>
                            <input
                                className='form-control'
                                type='password'
                                onChange={this.updateNewPassword}
                                value={this.state.newPassword}
                            />
                        </div>
                    </div>
                );
                inputs.push(
                    <div
                        key='retypeNewPasswordUpdateForm'
                        className='form-group'
                    >
                        <label className='col-sm-5 control-label'>Retype New Password</label>
                        <div className='col-sm-7'>
                            <input
                                className='form-control'
                                type='password'
                                onChange={this.updateConfirmPassword}
                                value={this.state.confirmPassword}
                            />
                        </div>
                    </div>
                );

                submit = this.submitPassword;
            } else {
                inputs.push(
                    <div
                        key='oauthPasswordInfo'
                        className='form-group'
                    >
                        <label className='col-sm-12'>Log in occurs through Firefox Accounts. Please see your GitLab account settings page to update your password.</label>
                    </div>
                );
            }

            updateSectionStatus = function resetSection(e) {
                this.props.updateSection('');
                this.setState({currentPassword: '', newPassword: '', confirmPassword: '', serverError: null, passwordError: null});
                e.preventDefault();
            }.bind(this);

            passwordSection = (
                <SettingItemMax
                    title='Password'
                    inputs={inputs}
                    submit={submit}
                    server_error={serverError}
                    client_error={passwordError}
                    updateSection={updateSectionStatus}
                />
            );
        } else {
            var describe;
            if (this.props.user.auth_service === '') {
                var d = new Date(this.props.user.last_password_update);
                var hour = '12';
                if (d.getHours() % 12) {
                    hour = String(d.getHours() % 12);
                }
                var min = String(d.getMinutes());
                if (d.getMinutes() < 10) {
                    min = '0' + d.getMinutes();
                }
                var timeOfDay = ' am';
                if (d.getHours() >= 12) {
                    timeOfDay = ' pm';
                }

                describe = 'Last updated ' + Constants.MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' at ' + hour + ':' + min + timeOfDay;
            } else {
                describe = 'Log in done through GitLab';
            }

            updateSectionStatus = function updateSection() {
                this.props.updateSection('password');
            }.bind(this);

            passwordSection = (
                <SettingItemMin
                    title='Password'
                    describe={describe}
                    updateSection={updateSectionStatus}
                />
            );
        }

        return (
            <div>
                <div className='modal-header'>
                    <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                        aria-label='Close'
                        onClick={this.props.closeModal}
                    >
                        <span aria-hidden='true'>{'×'}</span>
                    </button>
                    <h4
                        className='modal-title'
                        ref='title'
                    >
                        <i
                            className='modal-back'
                            onClick={this.props.collapseModal}
                        />
                        {'Security Settings'}
                    </h4>
                </div>
                <div className='user-settings'>
                    <h3 className='tab-header'>Security Settings</h3>
                    <div className='divider-dark first'/>
                    {passwordSection}
                    <div className='divider-dark'/>
                    <br></br>
                    <a
                        className='security-links theme'
                        href='#'
                        onClick={this.showAccessHistoryModal}
                    >
                        <i className='fa fa-clock-o'></i>View Access History
                    </a>
                    <b> </b>
                    <a
                        className='security-links theme'
                        href='#'
                        onClick={this.showActivityLogModal}
                    >
                        <i className='fa fa-globe'></i>View and Logout of Active Sessions
                    </a>
                </div>
                <AccessHistoryModal
                    show={this.state.showAccessHistoryModal}
                    onModalDismissed={this.hideModals}
                />
                <ActivityLogModal
                    show={this.state.showActivityLogModal}
                    onModalDismissed={this.hideModals}
                />
            </div>
        );
    }
}

SecurityTab.defaultProps = {
    user: {},
    activeSection: ''
};
SecurityTab.propTypes = {
    user: React.PropTypes.object,
    activeSection: React.PropTypes.string,
    updateSection: React.PropTypes.func,
    updateTab: React.PropTypes.func,
    closeModal: React.PropTypes.func.isRequired,
    collapseModal: React.PropTypes.func.isRequired,
    setEnforceFocus: React.PropTypes.func.isRequired
};
