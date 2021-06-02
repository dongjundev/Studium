package board.configuration;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@PropertySource("classpath:/application.properties") //application.properties를 사용할 수 있도록 설정 파일의 위치를 정해 준다.
public class DatabaseConfiguration {
	
	@Autowired
	private ApplicationContext applicationContext;		//bean 객체를 생성하고 관리하는 기능(beanfactory를 상속받음.)

    // application.properties에 설정했던 데이터베이스 관련 정보를 사용하도록 지정한다.
	//@ConfigurationProperties 어노테이션에 prefix가 spring.datasource.hikari로 설정되었기 때문에 
	//spring.datasource.hikari로 시작하는 설정을 이용해서 히카리CP의 설정파일을 만든다.
    @Bean
    @ConfigurationProperties(prefix="spring.datasource.hikari")		//@ConfigurationProperties : *.properties, *.yml 파일에 있는 property를 자바 클래스에 값을 가져와서 사용 할 수 있게 해주는 어노테이션
    public HikariConfig hikariConfig() {
        return new HikariConfig();
    }

    //앞에서 만든 히카리CP의 설정파일을 이용해서 데이터베이스와 연결하는 데이터 소스를 생성한다. 
    //여기서는 데이터 소스가 정상적으로 생성되었는지 확인하기 위해서 데이터 소스를 출력했다.
    @Bean
    public DataSource dataSource() throws Exception {
        DataSource dataSource = new HikariDataSource(hikariConfig());
        System.out.println(dataSource.toString());
        return dataSource;
    }
    
    @Bean
    @ConfigurationProperties(prefix = "mybatis.configuration")  //@ConfigurationProperties을 통해서 application.properties에서 prefix가 mybatis.configuration인 설정을 가져온다.
    public org.apache.ibatis.session.Configuration mybatisConfig(){
        return new org.apache.ibatis.session.Configuration();   //가져온 마이바티스 설정을 자바 클래스로 만들어 반환한다.
    }
    
    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {	//SqlSessionFactory : mybatis와 mysql 서버를 연동시켜줌, sqlsession 생성
    	//sqlsession : 세션을 한번 생성하면 매핑구문을 실행하거나 커밋 또는 롤백을 하기 위해 세션을 사용할수 있다. 더 이상 필요하지 않은 상태가 되면 세션을 닫는다.
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:/mapper/**/*.xml"));	//** : 하위폴더전체
        sqlSessionFactoryBean.setConfiguration(mybatisConfig());	//해당 설정을 sqlSessionFactory에 설정해준다.
        return sqlSessionFactoryBean.getObject();
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {		//SqlSessionTemplate은 SqlSession을 구현하고 코드에서 SqlSession를 대체하는 역할을 한다.
        return new SqlSessionTemplate(sqlSessionFactory);
    }
    
}
