import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from '@react-pdf/renderer';
import logo from '../../images/logo.png'

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: 'Helvetica',
        textAlign: 'center'
    },
    headingCenter: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 15,
    },
    card: {
        padding: 10,
        border: '1px solid black',
        borderRadius: 5,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 4,
        textAlign: 'center',
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
    },
    tableCell: {
        margin: 4,
    },
    setHeader: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    setResultRow: {
        width: '100%',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
        height: 20,
    },
    resultCol: {
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign: 'center',
    },
    labelA: {
        color: '#5DADE2'
    },
    labelB: {
        color: '#76D7C4'
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
      },
      logo: {
        width: 50,
        height: 50,
      },
});

const ScoreCard = ({ tournament, teamNames, teamPlayers, matchDate, matchResult, scores }) => {
    const calculateSetWin = (teamName) => {
        return scores?.setResult?.filter(item => item === teamName).length || 0;
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.imageContainer}>
                    <Image
                    style={styles.logo}
                    src={logo}
                    />
                    <Text style={[styles.headingCenter, {fontSize: 24}]}>NIT JAMSHEDPUR LAWN TENNIS</Text>
                </View>
                <Text style={styles.headingCenter}>MATCH SUMMARY</Text>
                <View style={styles.section}>
                    <View style={styles.card}>
                        <Text style={{ textAlign: 'center', fontSize: 14, marginBottom: 6, fontWeight: 'bold' }}>{tournament?.name}</Text>
                        <View style={styles.row}>
                            <View>
                                <Text style={[styles.label, styles.labelA, { textAlign: 'center' }]}>{teamNames?.teamA}</Text>
                                {teamPlayers?.teamA?.map((player, i) => <Text key={i} style={styles.labelA}>{player}</Text>)}
                            </View>
                            <View>
                                <Text>VS</Text>
                            </View>
                            <View>
                                <Text style={[styles.label, styles.labelB, { textAlign: 'center' }]}>{teamNames.teamB}</Text>
                                {teamPlayers.teamB.map((player, i) => <Text key={i} style={styles.labelB}>{player}</Text>)}
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={[{ marginTop: 6 }]}>MATCH DATE: {matchDate}</Text>
                            </View>
                            <View>
                                <Text style={{ marginTop: 4 }}>
                                    MATCH WINNER: {
                                        matchResult===teamNames.teamA?
                                        <Text style={[styles.label, styles.labelA]}>{matchResult}</Text>:
                                        <Text style={[styles.label, styles.labelB]}>{matchResult}</Text>
                                    }
                                </Text>
                            </View>
                            <View>
                                <Text style={{ marginTop: 4 }}>
                                    SET SCORE: 
                                    <Text style={[styles.label, styles.labelA]}> {calculateSetWin(teamNames.teamA)}</Text>
                                    <Text> - </Text>
                                    <Text style={[styles.label, styles.labelB]}>{calculateSetWin(teamNames.teamB)}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {scores?.sets?.map((set, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.setHeader}>SET {index + 1}</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>GAME</Text>
                                <Text style={[styles.tableColHeader, styles.labelA]}>{teamNames.teamA}</Text>
                                <Text style={[styles.tableColHeader, styles.labelB]}>{teamNames.teamB}</Text>
                                <Text style={styles.tableColHeader}>WINNER</Text>
                            </View>
                            {set.map((g, i) => (
                                <View key={i} style={styles.tableRow}>
                                    <Text style={styles.tableCol}><Text style={styles.tableCell}>{i + 1}</Text></Text>
                                    <Text style={styles.tableCol}><Text style={[styles.tableCell, styles.labelA]}>{g.teamA}</Text></Text>
                                    <Text style={styles.tableCol}><Text style={[styles.tableCell, styles.labelA]}>{g.teamB}</Text></Text>
                                    <Text style={styles.tableCol}>
                                        {g.result === teamNames.teamA && <Text style={[styles.tableCell, styles.label, styles.labelA]}>{g.result}</Text>}
                                        {g.result === teamNames.teamB && <Text style={[styles.tableCell, styles.label, styles.labelB]}>{g.result}</Text>}
                                    </Text>
                                </View>
                            ))}
                            <View style={styles.setResultRow}>
                                <Text style={styles.resultCol}><Text style={styles.tableCell}>GAME RESULT</Text></Text>
                                <Text style={styles.resultCol} colSpan={3}>
                                    <Text style={[styles.tableCell, styles.label, styles.labelA]}>{scores?.gameResult[index][0]}</Text>
                                    <Text> - </Text>
                                    <Text style={[styles.tableCell, styles.label, styles.labelB]}>{scores?.gameResult[index][1]}</Text>
                                </Text>
                            </View>
                            <View style={styles.setResultRow}>
                                <Text style={styles.resultCol}><Text style={styles.tableCell}>SET RESULT</Text></Text>
                                <Text style={styles.resultCol} colSpan={3}>
                                    {
                                        scores?.setResult[index] === teamNames?.teamA &&
                                        <Text style={[styles.tableCell, styles.label, styles.labelA]}>{scores?.setResult[index]}</Text>
                                    }
                                    {
                                        scores?.setResult[index] === teamNames?.teamB &&
                                        <Text style={[styles.tableCell, styles.label, styles.labelB]}>{scores?.setResult[index]}</Text>
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
                <View style={styles.section}>
                    <Text>This is a digitally generated Score Card and doesn't require any signature for official use.</Text>
                    <Text>Please contact the organiser for any queries regarding scoresheet.</Text>
                </View>
            </Page>
        </Document>
    );
};

export default ScoreCard;