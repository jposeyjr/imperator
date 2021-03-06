import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Chart from 'react-apexcharts';

// single company graph
const SingleCompanyGraph = () => {
  const location = useRouteMatch();
  const allCompanyData = useSelector((store) => store.totalAction);
  const singleCompanyData = useSelector((store) => store.singleCompanyData);
  const dispatch = useDispatch();
  const companyUsers = useSelector((redux) => redux.singleCompanyUsers);

  useEffect(() => {
    dispatch({
      type: 'FETCH_SINGLE_COMPANY_DATA',
      param: { id: location.params.id },
    });
    dispatch({ type: 'FETCH_TOTAL_ACTIONS' });
  }, []);

  const [opt, setOpt] = useState({
    series: [
      {
        name: 'Average company',
      },
      {
        name: 'This Company',
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      colors: ['#09588E', '#EE5F1B'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Projects',
          'Insights',
          'Documents',
          'Hashtags',
          'Notes',
          'Total',
        ],
      },
      yaxis: {
        title: {
          text: 'Actions',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });

  const allCompanyActions = [
    allCompanyData.projects.count / allCompanyData.Total_Companies,
    allCompanyData.insights.count / allCompanyData.Total_Companies,
    allCompanyData.documents.count / allCompanyData.Total_Companies,
    allCompanyData.hashtags.count / allCompanyData.Total_Companies,
    allCompanyData.notes.count / allCompanyData.Total_Companies,
    allCompanyData.hashtags.count / allCompanyData.Total_Companies +
      allCompanyData.documents.count / allCompanyData.Total_Companies +
      allCompanyData.insights.count / allCompanyData.Total_Companies +
      allCompanyData.notes.count / allCompanyData.Total_Companies +
      allCompanyData.projects.count / allCompanyData.Total_Companies,
  ];
  const singleCompanyActions = [
    singleCompanyData.projectsTotal,
    singleCompanyData.insightsTotal,
    singleCompanyData.documentsTotal,
    singleCompanyData.hashtagsTotal,
    singleCompanyData.notesTotal,
    singleCompanyData.hashtagsTotal +
      singleCompanyData.documentsTotal +
      singleCompanyData.insightsTotal +
      singleCompanyData.notesTotal +
      singleCompanyData.projectsTotal,
  ];

  const companyName = companyUsers[0]?.company;

  return (
    <>
      {/* this is where we pass the company name  */}
      <h4 className='title'>Actions For {companyName}</h4>
      <Chart
        options={opt.options}
        series={[
          {
            name: 'Average Aurelius Actions',
            data: [6, 7, 5, 10, 15, 44],
          },
          {
            name: `${singleCompanyData.company} Actions`,
            data: singleCompanyActions,
          },
        ]}
        type='bar'
        height={350}
      />
    </>
  );
};

export default SingleCompanyGraph;
