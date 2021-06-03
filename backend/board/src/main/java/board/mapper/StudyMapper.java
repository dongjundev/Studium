package board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import board.dto.StudyDto;

@Mapper
public interface StudyMapper {
	List<StudyDto> selectStudyList() throws Exception;
	List<StudyDto> searchStudy(Map<String,String> map) throws Exception; //스터디 검색
}
