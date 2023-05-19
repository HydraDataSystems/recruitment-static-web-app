import { PropsWithChildren } from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

type Props = {
  title: string;
}

const Section = ({ title, children }: PropsWithChildren<Props>) => {
  
  const styles = StyleSheet.create({
    section: {
      display: 'flex',
      padding: "0 20 20 20",
      fontSize: 14,
    },
    sectionTitle: {
      display: 'flex',
      fontSize: 18,
      fontWeight: 'bold',
      padding: "5 10",
      backgroundColor: '#5da2da',
      color: '#FFFFFF',
    }
  });

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <Text>{title}</Text>
      </View>
      {children}
    </View>
  );
};

export default Section;