package board.service;

import java.util.List;

import board.dto.StudyDto;

public interface StudyService {
	List<StudyDto> selectStudyList() throws Exception;
	List<StudyDto> searchStudyList() throws Exception;
}
