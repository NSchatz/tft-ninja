import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import User from './User';

export default function Matches() {
  const { data, isLoading, isError, message } = useSelector((state) => state.tft);
  console.log(data);
  return (
    <div>
      {data ? (
        <>
          <User data={data} />
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
