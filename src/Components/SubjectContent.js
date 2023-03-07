import React from "react";

const SubjectContent = ({ data }) => {
  return (
    <div>
      {data.length > 0 && (
        <div>
          <table id="book">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Title and sub title</th>
                <th>Author</th>
                {/* <th>Published year</th> */}
                <th>First published year</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data?.map((item, i) => {
                  // console.log(item.title);
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.authors[0].name}</td>
                      {/* <td className="publishyear">{item.publish_year}</td> */}
                      <td>{item.first_publish_year}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubjectContent;
