import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import useTransactions from '../../useTransaction';
import useStyles from './style';

ChartJS.register(ArcElement, Tooltip, Legend);

const Details = ({ title }) => {
  const classes = useStyles();
  const { total, chartData } = useTransactions(title);

  return (
    <div>
      <Card className={title === 'Income' ? classes.income : classes.expense}>
        <CardHeader title={title} />
        <CardContent>
          <Typography variant="h6">₹{total}</Typography>
          <Doughnut data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
