import { PropsWithChildren } from "react";
import { StyleSheet, View, Text } from "@react-pdf/renderer";

type Props = {
  title: string;
};

const SectionRow = ({ title, children }: PropsWithChildren<Props>) => {
  const styles = StyleSheet.create({
    row: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#f0f0f0',
      borderLeft: '1px solid #5da2da',
      borderRight: '1px solid #5da2da',
    },
    left: {
      flex: 1,
      width: "100%",
      fontStyle: 'ultrabold',
      padding: "5 10",
      borderRight: '1px solid #5da2da',
      borderBottom: '1px solid #5da2da',
      whiteSpace: 'nowrap'
    },
    right: {
      flex: 1,
      width: '100%',
      backgroundColor: '#ffffff',
      padding: "5 10",
      borderBottom: '1px solid #5da2da',
      whiteSpace: 'nowrap',
    }
  });

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text>{title}</Text>
      </View>
      <View style={styles.right}>
        <Text>{children}</Text>
      </View>
    </View>
  );
}

export default SectionRow;