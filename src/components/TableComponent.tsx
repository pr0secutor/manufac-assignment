import React from 'react';
import { Table } from '@mantine/core';

interface TableData {
  year: number;
  maxCrop: string;
  minCrop: string;
}

const TableComponent: React.FC<{ data: TableData[] }> = ({ data }) => {
  return (
    <div style={{padding:'20px'}}>
      <Table
        highlightOnHover
        withRowBorders
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: 'left', padding: '10px' }}>Year</Table.Th>
            <Table.Th style={{ textAlign: 'left', padding: '10px' }}>Crop with Maximum Production</Table.Th>
            <Table.Th style={{ textAlign: 'left', padding: '10px' }}>Crop with Minimum Production</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row, index) => (
            <Table.Tr key={index}>
              <Table.Td style={{ padding: '10px' }}>{row.year}</Table.Td>
              <Table.Td style={{ padding: '10px' }}>{row.maxCrop}</Table.Td>
              <Table.Td style={{ padding: '10px' }}>{row.minCrop}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
