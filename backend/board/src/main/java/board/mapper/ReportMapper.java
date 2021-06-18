package board.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReportMapper {
	void reportStudy(int studyId, String reportMemberId, String reportDescription) throws Exception;
	void reportMember(String memberId, String reportMemberId, String reportDescription) throws Exception;
}
