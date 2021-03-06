import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';

import I18n from '../../i18n';
import StatusBar from '../../containers/StatusBar';
import { DrawerButton } from '../../containers/HeaderButton';
import { withTheme } from '../../theme';
import { getUserSelector } from '../../selectors/login';
import SafeAreaView from '../../containers/SafeAreaView';

class AdminPanelView extends React.Component {
	static navigationOptions = ({ navigation, isMasterDetail }) => ({
		headerLeft: isMasterDetail ? undefined : () => <DrawerButton navigation={navigation} />,
		title: I18n.t('Admin_Panel')
	})

	static propTypes = {
		baseUrl: PropTypes.string,
		token: PropTypes.string,
		theme: PropTypes.string
	}

	render() {
		const { baseUrl, token, theme } = this.props;
		if (!baseUrl) {
			return null;
		}
		return (
			<SafeAreaView theme={theme}>
				<StatusBar theme={theme} />
				<WebView
					// https://github.com/react-native-community/react-native-webview/issues/1311
					onMessage={() => {}}
					source={{ uri: `${ baseUrl }/admin/info?layout=embedded` }}
					injectedJavaScript={`Meteor.loginWithToken('${ token }', function() { })`}
				/>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	baseUrl: state.server.server,
	token: getUserSelector(state).token
});

export default connect(mapStateToProps)(withTheme(AdminPanelView));
