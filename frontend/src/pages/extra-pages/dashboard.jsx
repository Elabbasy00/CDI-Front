// material-ui

// project import
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import AnalyticNumberCard from 'components/cards/statistics/AnalyticNumberCard';
import ApexPieChart from 'components/cards/statistics/ApexPieChart';
import IncomeAreaChart from 'components/cards/statistics/IncomeCharts';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticNumberCard title="All Charts Cost" count="101,222,000 AED" extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticNumberCard title="Potential Savings" count="28,395,000 AED" extra="35,000" />
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticNumberCard title="Potential Uncovered" count="1,843,000 AED" extra="35,000" />
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticNumberCard title="All Charts Cost" count="7892 Chart" extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticNumberCard title="Charts Reviewed" count="4,735 Chart" extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticNumberCard title="Queries Closed" count="3,156 Query" extra="35,000" />
      </Grid>
      <Grid item xs={12} md={6}>
        <MainCard title="Chart and Querie Status">
          <ApexPieChart />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <MainCard>
          <IncomeAreaChart />
        </MainCard>
      </Grid>
    </Grid>
  );
}
