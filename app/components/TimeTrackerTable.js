import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import { Grid, Col, Row, View, Button } from 'native-base';
import { map } from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react/native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

//MobX
import timeTrackerStore from '../stores/TimeTrackerStore';
import userStore from '../stores/UserStore';

@observer
class TimeTrackerTable extends Component {
	printTime = (time) => {
		timeTrackerStore.parseTime(time);
	}

    render() {
        return (
            <Grid style={{ alignItems: 'center' }}>
			{/* Table Labels */}
              <Row style={{ height: 30 }} >
                <Col size={40} style={styles.tableStyle.titleFirst}>
                  <Text style={{ fontWeight: 'bold' }}>In Time</Text>
                </Col>
                <Col size={40} style={styles.tableStyle.title}>
                  <Text style={{ fontWeight: 'bold' }}>Out Time</Text>
              	</Col>
			  	<Col size={20} style={styles.tableStyle.titleLast}>
					<Text style={{ fontWeight: 'bold' }}>Delete</Text>
				</Col>
              </Row>
			  {/* Table Content */}
			  {map(timeTrackerStore.timeTrackerList, (item) =>
				  <Row style={{ height: 40 }} key={item.Tracker_Id}>
					{/* In_Time */}
					<Col size={40} style={styles.tableStyle.bodyFirst}>
					  <DatePicker
						style={{ flex: 1 }}
						customStyles={{
							dateText: {
								fontWeight: 'bold'
							},
							dateInput: {
								borderWidth: 0
							}
						}}
						androidMode={'spinner'}
						date={timeTrackerStore.parseTime(item.In_Time)}
						placeholder={' '}
						mode="time"
						format="hh:mm a"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						minuteInterval={15}
						showIcon={false}
						is24Hour={false}
						onDateChange={(time) => {
							//2017-07-06T08:01:55.51
							timeTrackerStore.inTimeDisplay = time;  // Sets view to see 12 hr
							//print(moment_24hr.hours() + ':' + moment_24hr.minutes());
							const moment_24hr = moment(time, 'hh:mm a'); // Converts to 24 hr
							let hours = moment_24hr.hours();
							let minutes = moment_24hr.minutes();
							if (hours < 10) hours = `0${hours}`;
							if (minutes < 10) minutes = `0${minutes}`;
							const newTime = moment().format(`YYYY[-]MM[-]DD[T]${hours}[:]${minutes}[:]ss[.]SS`);
							//console.log(newTime);

							timeTrackerStore.inTime = newTime;
							timeTrackerStore.updateRow('PUT', item.Tracker_Id);
						}}
					  />
					</Col>
					{/* Out_Time */}
					<Col size={40} style={styles.tableStyle.body}>
					  <DatePicker
						//style={{ flex: 1 }}
						customStyles={{
							dateText: {
								fontWeight: 'bold'
							},
							dateInput: {
								borderWidth: 0
							}
						}}
						androidMode={'spinner'}
						date={(item.Out_Time !== null) ? timeTrackerStore.parseTime(item.Out_Time) : 0}
						placeholder={' '}
						mode="time"
						format="hh:mm a"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						minuteInterval={15}
						showIcon={false}
						is24Hour={false}
						onDateChange={(time) => {
							//2017-07-06T08:01:55.51
							timeTrackerStore.outTimeDisplay = time;  // Sets view to see 12 hr
							//print(moment_24hr.hours() + ':' + moment_24hr.minutes());
							const moment_24hr = moment(time, 'hh:mm a'); // Converts to 24 hr
							let hours = moment_24hr.hours();
							let minutes = moment_24hr.minutes();
							if (hours < 10) hours = `0${hours}`;
							if (minutes < 10) minutes = `0${minutes}`;
							const newTime = moment().format(`YYYY[-]MM[-]DD[T]${hours}[:]${minutes}[:]ss[.]SS`);
							//console.log(newTime);

							timeTrackerStore.outTime = newTime;
							timeTrackerStore.updateRow('PUT', item.Tracker_Id);
						}}
					  />
					</Col>
					{/* Delete_Row */}
					<Col size={20} style={styles.tableStyle.bodyLast}>
					  <View style={{ flex: 1 }}>
						  <Button
							  transparent
							  onPress={() => {
		                     userStore.loggedIn = false;
		                     Alert.alert(
		                       'Delete Time Entry?',
		                        ' ',
		                        [
		                          { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
		                          { text: 'OK',
		                          onPress: () => {
		                              timeTrackerStore.deleteRow(item.Tracker_Id);
		                          } },
		                        ]
		                     );
		                 }}
						  >
							  <MaterialCommunityIcons name='delete-forever' size={26} style={{ justifyContent: 'center', alignItems: 'center', color: 'red', borderWidth: 0.2 }} />
						  </Button>
					  </View>
					</Col>
				 </Row>
			  )}

{/*---------------------------------------------------------------------------------------*/}
			  	{/*New Rows*/}
				<Row style={{ height: 40 }} >
				{/* In_Time */}
				  <Col size={40} style={styles.pinkTableStyle.bodyFirst}>
					  <DatePicker
						style={{ flex: 1 }}
						customStyles={{
							placeholderText: {
								fontWeight: 'bold',
								fontStyle: 'italic',
								color: 'black'
							},
							dateInput: {
								borderWidth: 0
							}
						}}
						androidMode={'spinner'}
						date={timeTrackerStore.inTimeDisplay}
						placeholder={'New Time Entry'}
						mode="time"
						format="hh:mm a"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						minuteInterval={15}
						showIcon={false}
						is24Hour={false}
						onDateChange={(time) => {
							//2017-07-06T08:01:55.51
							timeTrackerStore.inTimeDisplay = time;  // Sets view to see 12 hr
							//print(moment_24hr.hours() + ':' + moment_24hr.minutes());
							const moment_24hr = moment(time, 'hh:mm a'); // Converts to 24 hr
							let hours = moment_24hr.hours();
							let minutes = moment_24hr.minutes();
							if (hours < 10) hours = `0${hours}`;
							if (minutes < 10) minutes = `0${minutes}`;
							const newTime = moment().format(`YYYY[-]MM[-]DD[T]${hours}[:]${minutes}[:]ss[.]SS`);
							//console.log(newTime);

							timeTrackerStore.inTime = newTime;
							timeTrackerStore.updateRow('POST', null);
						}}
					  />
				  </Col>
				  {/* Out_Time */}
				  <Col size={40} style={styles.pinkTableStyle.body}>
					  <Text style={[styles.tableStyle.bodyText, styles.bold]}>------------</Text>
				  </Col>
				  <Col size={20} style={styles.pinkTableStyle.bodyLast}>
					  <Text style={[styles.tableStyle.bodyText, styles.bold]}>-----</Text>
				  </Col>
			  	</Row>
				{/*End New Rows*/}

             </Grid>
        );
    }
}

const styles = {
	container: {
		flex: 1
	},
	bold: {
		fontWeight: 'bold'
	},
	tableStyle: {
		titleFirst: {
			backgroundColor: '#a0a6ab',
			borderWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		title: {
			backgroundColor: '#a0a6ab',
			borderTopWidth: 1,
			borderBottomWidth: 1,
			borderRightWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		titleLast: {
			backgroundColor: '#a0a6ab',
			borderTopWidth: 1,
			borderBottomWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		bodyFirst: {
			backgroundColor: '#fff',
			borderLeftWidth: 1,
			borderBottomWidth: 1,
			borderRightWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		body: {
			backgroundColor: '#fff',
			borderBottomWidth: 1,
			borderRightWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		bodyLast: {
			backgroundColor: '#fff',
			borderBottomWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		bodyText: {
			fontSize: 14
		}
	},
    pinkTableStyle: {
		bodyFirst: {
			backgroundColor: '#FFC0CB',
			borderLeftWidth: 1,
			borderBottomWidth: 1,
			borderRightWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		body: {
			backgroundColor: '#FFC0CB',
			borderBottomWidth: 1,
			borderRightWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		bodyLast: {
			backgroundColor: '#FFC0CB',
			borderBottomWidth: 1,
			justifyContent: 'center',
			alignItems: 'center'
		}
	},
	hoursEntryBorder: {
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 18,
		height: 25,
		width: 50
	}
};

export { TimeTrackerTable };
