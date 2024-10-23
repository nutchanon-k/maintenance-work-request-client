import React, { useRef } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import MTTRChart from '../components/Graph/MTTRChart';
import RootCauseFailureChart from '../components/Graph/RootCauseFailureChart';
import MaintenanceStatus from '../components/Graph/MaintenanceStatus';
import RequestStatus from '../components/Graph/RequestStatus';
import LocationDepartmentChart from '../components/Graph/LocationDepartmentChart';
import useUserStore from '../store/UserStore';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Home = () => {
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);

  const role = user?.role;
  const level = user?.level;
  const department = user?.department?.name;
  const location = user?.location?.name;
  const departmentType = user?.department?.departmentType;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const email = user?.email;

  const getChartImage = (chartRef) => {
    if (chartRef && chartRef.current && chartRef.current.toBase64Image) {
      return chartRef.current.toBase64Image();
    } else {
      console.error('Chart.js instance not found for the given ref.');
      return '';
    }
  };

  const getImageAsBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const exportToPDF = async () => {
    try {
      const logoBase64 = await getImageAsBase64('/assets/maintenanceWorkRequest.png');
      const requestStatusImage = getChartImage(requestStatusRef);
      const maintenanceStatusImage = getChartImage(maintenanceStatusRef);
      const locationDepartmentImage = getChartImage(locationDepartmentRef);
      const rootCauseFailureImage = getChartImage(rootCauseFailureRef);
      const mttrChartImage = getChartImage(mttrChartRef);

      const docDefinition = {
        content: [
          // Cover Page
          {
            text: 'Dashboard Report',
            style: 'coverHeader',
            alignment: 'center',
            margin: [40, 150, 40, 20],
          },
          {
            text: `Generated by: ${firstName + ' ' + lastName || 'Unknown User'}`,
            style: 'normal',
            alignment: 'center',
          },
          {
            text: `Date: ${new Date().toLocaleDateString()}`,
            style: 'normal',
            alignment: 'center',
          },
          { text: '', pageBreak: 'after' },

          // User Information
          { text: 'User Information', style: 'subheader' },
          { text: `Name: ${firstName + ' ' + lastName || 'Unknown'}`, style: 'normal' },
          { text: `Email: ${email || 'Unknown'}`, style: 'normal' },
          { text: `Department: ${department || 'Unknown'}`, style: 'normal' },
          { text: `Department Type: ${departmentType || 'Unknown'}`, style: 'normal' },
          { text: `Location: ${location || 'Unknown'}`, style: 'normal' },
          { text: '', pageBreak: 'after' },

          // Key Metrics - Request Task Status
          { text: 'Request Task Status', style: 'subheader', alignment: 'center'  },
          { image: requestStatusImage, width: 350, alignment: 'center', },
          { text: '', pageBreak: 'after' },

          // Location Department Chart
          { text: 'Location Department Chart', style: 'sectionHeader', alignment: 'center' },
          { image: locationDepartmentImage, width: 500, alignment: 'center'},
          { text: '', pageBreak: 'after' },

          // Key Metrics - Maintenance Task Status
          { text: 'Maintenance Task Status', style: 'subheader', alignment: 'center' },
          { image: maintenanceStatusImage, width: 350, alignment: 'center' },
          { text: '', pageBreak: 'after' },

          // Root Cause Failure Chart
          { text: 'Root Cause Failure Chart', style: 'sectionHeader', alignment: 'center' },
          { image: rootCauseFailureImage, width: 500, alignment: 'center' },
          { text: '', pageBreak: 'after' },

          // MTTR Chart
          { text: 'MTTR Chart', style: 'sectionHeader', alignment: 'center' },
          { image: mttrChartImage, width: 500, alignment: 'center' },
        ],
        styles: {
          coverHeader: { fontSize: 32, bold: true, margin: [40, 150, 40, 20] },
          subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
          sectionHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
          normal: { fontSize: 12, margin: [0, 5, 0, 5] },
        },
        header: {
          columns: [
            { text: 'Dashboard Report - Maintenance System', alignment: 'center', style: 'header' },
          ],
        },
        footer: (currentPage, pageCount) => ({
          columns: [
            { text: `© 2024 [Code camp Thailand #18]`, alignment: 'left', style: 'footer', margin: [10, 0, 0, 0] },
            { text: `Page ${currentPage} of ${pageCount}`, alignment: 'right', style: 'footer', margin: [0, 0, 10, 0] },
          ],
        }),
      };

      pdfMake.createPdf(docDefinition).download('dashboard.pdf');
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  };

  const requestStatusRef = useRef(null);
  const maintenanceStatusRef = useRef(null);
  const locationDepartmentRef = useRef(null);
  const rootCauseFailureRef = useRef(null);
  const mttrChartRef = useRef(null);

  return (
    <div className='container mx-auto p-4'>
      {role === 'admin' || level !== 'staff' ? (
        <>
          <div>
            <div className='flex flex-col items-center justify-around'>
              <div className='w-full h-full p-4 flex items-center '>
                <div className='w-1/2 h-1/4 chart-container'>
                  <RequestStatus ref={requestStatusRef} />
                </div>
                <div className='w-full chart-container'>
                  <LocationDepartmentChart ref={locationDepartmentRef} />
                </div>
              </div>
              <div className='w-full h-full p-4 flex items-center justify-around '>
                <div className='w-1/2 h-1/4 chart-container'>
                  <MaintenanceStatus ref={maintenanceStatusRef} />
                </div>
                <div className='w-full chart-container'>
                  <RootCauseFailureChart ref={rootCauseFailureRef} />
                </div>
              </div>
              <div className='chart-container w-5/6'>
                <MTTRChart ref={mttrChartRef} />
              </div>
            </div>
          </div>

          {/* ปุ่ม Export เป็น PDF */}
          <div className='flex justify-center mt-4'>
            <button
              onClick={exportToPDF}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Export as PDF
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className='flex flex-col items-center justify-around'>
              <div className='w-full h-full p-4 flex items-center justify-around '>
                <div className='w-1/3 chart-container'>
                  <RequestStatus ref={requestStatusRef} />
                </div>
                <div className='w-1/3 chart-container'>
                  <MaintenanceStatus ref={maintenanceStatusRef} />
                </div>
              </div>
              <div className='w-5/6 chart-container'>
                <LocationDepartmentChart ref={locationDepartmentRef} />
              </div>
            </div>
          </div>

          {/* ปุ่ม Export เป็น PDF */}
          <div className='flex justify-center mt-4'>
            <button
              onClick={exportToPDF}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Export as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
