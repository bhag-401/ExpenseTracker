import React, { useEffect, useContext, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ExpenseTrackerContext } from '../../context/context';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyChart = () => {
  const { transactions } = useContext(ExpenseTrackerContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const monthlyData = {};

    // Process transactions to group by month and category
    transactions.forEach((transaction) => {
      if (transaction.type === 'Expense') {
        const date = new Date(transaction.date);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const key = `${month} ${year}`;

        if (!monthlyData[key]) {
          monthlyData[key] = {};
        }

        if (!monthlyData[key][transaction.category]) {
          monthlyData[key][transaction.category] = 0;
        }

        monthlyData[key][transaction.category] += transaction.amount;
      }
    });

    const labels = Object.keys(monthlyData);
    const categories = Array.from(new Set(
      Object.values(monthlyData).flatMap(month => Object.keys(month)))
    );

    // Prepare dataset for each category with unique colors
    const datasets = categories.map((category) => {
      const data = labels.map(month => monthlyData[month][category] || 0);
      return {
        label: category,
        data,
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`, // Unique random color for each category
        borderColor: 'rgba(0, 0, 0, 0.8)', // Slight border for clarity
        borderWidth: 1,
      };
    });

    setChartData({
      labels,
      datasets,
    });
  }, [transactions]);

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center',color:'white' }}>Monthly Expenses by Category</h2>
      <Bar
        data={chartData}
        options={{
          responsive: false, // Disable responsiveness for fixed width
          maintainAspectRatio: true, // Preserve width-to-height ratio
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#ffff', // Deep black for legend text
              },
            },
            title: {
              display: true,
              text: 'Monthly Expenses by Category',
              color: '#ffff', // Deep black for title 
             
            },
            tooltip: {
              enabled: true,
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for tooltips
              titleColor: '#ffffff', // White tooltip text
              bodyColor: '#ffffff',
            },
          },
          scales: {
            x: {
              stacked: false,
              barPercentage: 0.1, // Smaller bar width
              categoryPercentage: 0.3, // Reduced total width in category space
              ticks: {
                color: '#ffff',
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.2)',
              },
            },
            y: {
              stacked: false,
              beginAtZero: true,
              ticks: {
                color: '#ffff',
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.2)',
              },
            },
          },
        }}
        height={500} // Fixed height
        width={800} // Fixed width
      />
    </div>
  );
};

export default MonthlyChart;
