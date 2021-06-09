package board.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.context.request.RequestAttributes;

import board.dto.MemberDto;
import board.service.MemberService;

@Controller
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@RequestMapping("/user/login.do")
	public String login() throws Exception{
		return "/login";
	}
	
	@RequestMapping("/user/loginCheck.do")
	public String loginCheck(MemberDto member,HttpServletRequest request) throws Exception{
		
		  String dbPwd = memberService.login(String.valueOf(member.getMemberId())); 
		  //System.out.println("사용자에게 받은 값:: "+member.getMemberPw());
		  //System.out.println("db에서 받은 값:: "+dbPwd);
		  System.out.println(member); 
		  
		  if (dbPwd !=null) {
			  if (BCrypt.checkpw(member.getMemberPw(), dbPwd) == true) {
				  System.out.println("로그인 성공"); 
				  
				  // 서버에 세션 id 발급, 서버에서 받은 세션을 클라이언트 브라우저의 쿠키가 저장하여 가지고 있어야 함
				  //RequestAttributes requestAttribute = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
				  //requestAttribute.setAttribute("login", null, RequestAttributes.SCOPE_SESSION);
				  
				  HttpSession session = (HttpSession)request.getSession();
				  session.setAttribute("loginUser", member);

				  // 세션 아이디 가져오기
				  //System.out.println("세션 아이디 :: "+requestAttribute.getSessionId());
				  System.out.println("세션 아이디2 :: "+session.getId());
				  return "redirect:/home";
			  }
			  else {
				  System.out.println("로그인 실패"); 
				
			  }
		  }
		  else {
			  System.out.println("해당하는 아이디가 없습니다");
			  System.out.println("로그인 실패");
		  }
		  return "redirect:/user/login.do";

// 원래 코드
//		  String result = memberService.loginCheck(member); 
//		  ModelAndView mv = new ModelAndView();
//		  if(result == null) { 
//			  //mv.setViewName(null);
//			  System.out.println("로그인 실패"); 
//		  }else { 
//			  System.out.println("로그인 성공"); 
//			  return "redirect:/board/openBoardList.do";
//		  }
//		  
//		  return "redirect:/board/login.do";
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
			System.out.println("아이디가 중복입니다.");
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
		
		return "redirect:/user/login.do";
	}
	@ResponseBody
	@RequestMapping(value="user/idChk", method = RequestMethod.POST)
	public int idChk(MemberDto memberDto) throws Exception {
		int result = memberService.idChk(memberDto);
		return result;
	}
	
	// ---------------------------------로그아웃
	@RequestMapping("/user/logout.do")
	public String logout(MemberDto member,HttpServletRequest request) throws Exception {
		//RequestAttributes requestAttribute = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		//requestAttribute.setAttribute("loginUser", null, RequestAttributes.SCOPE_SESSION);
		
		HttpSession session = (HttpSession)request.getSession();
		session.setAttribute("loginUser", null);
		
		System.out.println("로그아웃 성공");
		
		return "redirect:/home";
	}

}
