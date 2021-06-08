package board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import board.dto.MemberDto;
import board.service.MemberService;

@Controller
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@RequestMapping("/board/login.do")
	public String login() throws Exception{
		return "/login";
	}
	
	@RequestMapping("/board/loginCheck.do")
	public String loginCheck(MemberDto member) throws Exception{
		
		  System.out.println("컨트롤러 들어옴"); 
		  String result = memberService.loginCheck(member); 
		  ModelAndView mv = new ModelAndView();
		  if(result == null) { 
			  //mv.setViewName(null);
			  System.out.println("로그인 실패"); 
		  }else { 
			  System.out.println("로그인 성공"); 
			  return "redirect:/board/openBoardList.do";
		  }
		  
		  return "redirect:/board/login.do";
	}
	
	
	// -------------------------------------------은지
	@RequestMapping("/user/join.do") 
	public String openUserWrite() throws Exception{
    	return "/memberJoin";
    }
	
	@RequestMapping("/user/insertMember.do") 
	public String insertMember(MemberDto member) throws Exception {
		//System.out.println("insert 들어옴");
		int result=memberService.idChk(member);
		//System.out.println(result);
	
		if(result==1) {
			// 아이디가 중복이면 
			return "redirect:/user/join.do";
		}
		else if (result==0){
			// 아이디가 중복이 아니면 db에 insert
			//System.out.println("else if (result==0)");
			String pwd=passwordEncoder.encode(member.getMemberPw());
			member.setMemberPw(pwd);
			//System.out.println(pwd);
			memberService.insertMember(member);
		}
		
		return "redirect:/board/login.do";
	}
	@ResponseBody
	@RequestMapping(value="user/idChk", method = RequestMethod.POST)
	public int idChk(MemberDto memberDto) throws Exception {
		int result = memberService.idChk(memberDto);
		return result;
	}

}
