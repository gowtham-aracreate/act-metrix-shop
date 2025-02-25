import React from 'react';
import { Card } from './Card';

const Cards = ({ fields,cardplace }) => {
  return (
    <div className={cardplace}>
      {fields.map((field, index) => (
        <div key={index}>
          <Card
                icon= {field.icon}
                alt= {field.alt}
                cardStyle= {field.cardStyle}
                dropdownButtonStyle= {field.dropdownButtonStyle}
                dropdownMenuStyle= {field.dropdownMenuStyle}
                dropdownButtonText= {field.dropdownButtonText}
                dropdownOptions= {field.dropdownOptions}
                titles= {[
                  { title: field.title1, subTitle: field.subTitle1},
                  { title: field.title2, subTitle: field.subTitle2 },
                  { title: field.title3, subTitle: field.subTitle3 }
              ]}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
