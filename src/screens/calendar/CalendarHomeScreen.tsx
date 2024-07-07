import Calendar from '@/components/calendar/Calendar';
import EventList from '@/components/calendar/EventList';
import {colors} from '@/constants';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPost';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        schedules={posts}
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
      />
      {/** EventList는 날짜를 클릭하면 달력 밑에 그날 갔던 피드를 보여준다 */}
      <EventList posts={posts[selectedDate]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarHomeScreen;
