import React from 'react';

const StructureCard = ({ d, showAvatar }) => {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#fff',
        position: 'absolute',
        marginTop: '-1px',
        marginLeft: '-1px',
        width: `${d.width}px`,
        height: `${d.height}px`,
        borderRadius: '10px',
        border: '1px solid #E4E2E9'
      }}
    >
      {!showAvatar ? (
        <div>
          <div
            style={{
              backgroundColor: '#E4E2E9',
              position: 'absolute',
              marginTop: '-25px',
              marginLeft: '15px',
              borderRadius: '100px',
              width: '50px',
              height: '50px'
            }}
          ></div>
          <img
            src={d.data.imageUrl || '/images/avatars/no-image.png'}
            alt="avatar"
            style={{
              position: 'absolute',
              marginTop: '-20px',
              marginLeft: '20px',
              borderRadius: '100px',
              width: '40px',
              height: '40px'
            }}
          />
        </div>
      ) : null}
      <div
        style={{
          color: '#08011E',
          position: 'absolute',
          right: '20px',
          top: '17px',
          fontSize: '10px'
        }}
      >
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div
        style={{
          fontSize: '15px',
          color: '#08011E',
          marginLeft: '20px',
          marginTop: '32px'
        }}
      >
        {d.data.name}
      </div>
      {d.data?.total >= 0 && (
        <div
          style={{
            fontSize: '15px',
            color: '#08011E',
            marginLeft: '20px',
            marginTop: '10px'
          }}
        >
          Total: {d.data.total}
        </div>
      )}
      <div
        style={{
          color: '#716E7B',
          marginLeft: '20px',
          marginTop: '3px',
          fontSize: '10px'
        }}
      >
        {' '}
        {d.data.positionName}{' '}
      </div>
    </div>
  );
};

export default StructureCard;
