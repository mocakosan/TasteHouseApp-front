import Loader from '@/components/common/Loader';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import FeedList from '@/components/feed/FeedList';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React, {Suspense} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

function FeedHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Loader />}>
          <FeedList />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {flex: 1},
  });

export default FeedHomeScreen;
