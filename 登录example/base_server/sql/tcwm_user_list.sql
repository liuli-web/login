SET NAMES UTF8;
DROP DATABASE IF EXISTS base_one;
CREATE DATABASE base_one CHARSET=UTF8;
USE base_one;


/**用户信息**/
CREATE TABLE base_one_list(
  uid int(12) PRIMARY KEY AUTO_INCREMENT,
  uname varchar(30) DEFAULT NULL,
  upwd varchar(30) DEFAULT NULL
);

INSERT INTO base_one_list VALUES(null, 'liuli', '12345678912')