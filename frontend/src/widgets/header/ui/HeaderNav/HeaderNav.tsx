"use client"

interface IHeaderNavProps {
  items: string[];
}
  
export const HeaderNav = ({ items }: IHeaderNavProps) => {
  return (
    <ul>
        { items.map((item, index) => (
          <li key={index}>
            { item }
          </li>
        )) }
    </ul>
  );
}